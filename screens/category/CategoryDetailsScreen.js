import React from 'react'
import {
  StyleSheet,
  View,
  ScrollView,
  Platform,
  Dimensions
} from 'react-native'
import { Provider, Title, Text } from 'react-native-paper'

import Colors from '../../constants/Colors'

import ActivityIndicator from '../../components/UI/ActivityIndicator'
import Dialog from '../../components/UI/Dialog'
import Card from '../../components/UI/Card'
import Input from '../../components/UI/Input'
import RadioButtonList from '../../components/UI/RadioButtonList'

import CategoryRest from '../../rests/CategoryRest'
import TransactionRest from '../../rests/TransactionRest'
import AccountRest from '../../rests/AccountRest'

import TransactionsDataTable from '../../components/dataTables/TransactionsDataTable'
import { CATEGORY_TYPES } from '../../models/Category'

export default class CategoryDetailsScreen extends React.Component {
  static navigationOptions = navData => {
    return {
      headerTitle: navData.navigation.getParam('categoryTitle')
    }
  }

  constructor (props) {
    super(props)
    this.state = {
      theme: 'blue',
      isLoading: false,
      dialog: {
        visible: false,
        message: null,
        title: null,
        onDismiss: this._hideDialog,
        buttons: { ok: { onPress: this._hideDialog, label: 'ok' } }
      },
      categoryId: null,
      category: null,
      transactions: null,
      addSumDialog: {
        visible: false,
        title: null,
        onDismiss: this._hideAddSumDialog,
        buttons: {
          ok: {
            onPress: this._addSum,
            label: 'add',
            icon: 'plus',
            disabled: true,
            loading: false
          },
          cancel: { onPress: this._hideAddSumDialog, label: 'cancel' }
        }
      },
      userAccounts: [],
      selectedAccountID: null,
      addSum: {
        value: null,
        isValid: false
      },
      transactionPagination: {
        page: 0,
        numberOfTransactions: 10,
        numberOfPages: 3
      }
    }
  }

  componentDidMount () {
    const categoryId = +this.props.navigation.getParam('categoryId')
    this.setState({
      isLoading: true,
      categoryId
    })
    CategoryRest.getCategoryById(categoryId).then(category => {
      this.setState({ isLoading: false, category })
    })
    this._getTransactions()
  }

  _getTransactions = () => {
    let { page, numberOfTransactions } = this.state.transactionPagination
    const categoryId = +this.props.navigation.getParam('categoryId')

    this.setState({ isLoading: true })
    TransactionRest.getTransactionsByCategoryId(
      categoryId,
      page,
      numberOfTransactions
    ).then(data => {
      const transactions = data.page.transactions
      this.setState(state => ({
        isLoading: false,
        transactions,
        transactionPagination: {
          ...state.transactionPagination,
          numberOfPages: data.page.numberOfPages
        }
      }))
    })
  }

  _getUserAccounts = () => {
    AccountRest.getAccounts().then(accounts => {
      this.setState(state => ({
        isLoading: false,
        userAccounts: accounts
      }))
    })
  }

  _hideDialog = () =>
    this.setState(state => ({ dialog: { ...state.dialog, visible: false } }))

  _hideAddSumDialog = () =>
    this.setState(state => ({
      addSumDialog: { ...state.addSumDialog, visible: false }
    }))

  _changeAddSumDialogOkBtnLoading = loading => {
    this.setState((state, props) => ({
      addSumDialog: {
        ...state.addSumDialog,
        buttons: {
          ...state.addSumDialog.buttons,
          ok: { ...state.addSumDialog.buttons.ok, loading }
        }
      }
    }))
  }

  _changeTransactionsPage = page => {
    this.setState(state => ({
      transactionPagination: {
        ...state.transactionPagination,
        page
      }
    }))
    this._getTransactions()
  }

  inputChangeHandler = (inputIdentifier, inputValue, inputValidity) => {
    this.setState((state, props) => ({
      [inputIdentifier]: { value: inputValue, isValid: inputValidity },
      addSumDialog: {
        ...state.addSumDialog,
        buttons: {
          ...state.addSumDialog.buttons,
          ok: {
            ...state.addSumDialog.buttons.ok,
            disabled: !inputValidity || !state.selectedAccountID
          }
        }
      }
    }))
  }

  _openAddSumDialogHandler = () => {
    this._getUserAccounts()
    this.setState(state => ({
      addSumDialog: {
        ...state.addSumDialog,
        visible: true
      }
    }))
  }

  _addSum = () => {
    this._changeAddSumDialogOkBtnLoading(true)

    // Account subtraction sum
    CategoryRest.addSum(this.state.categoryId, this.state.addSum.value).then(
      _ => {
        this._changeAddSumDialogOkBtnLoading(false)
        this._hideAddSumDialog()
      }
    )
  }

  _changeSelectAccountHandler = value =>
    this.setState({ selectedAccountID: value })

  _mapAccountsToRadioButtonData = () =>
    this.state.userAccounts.map(account => ({
      title: account.name,
      value: account.id
    }))

  render () {
    return (
      <Provider>
        <View style={styles.container}>
          <Dialog {...this.state.dialog} />
          {this._renderAddSumDialog()}

          {this.state.isLoading ? (
            <ActivityIndicator />
          ) : !this.state.categoryId ? (
            <Title>Not Added category yet!</Title>
          ) : (
            this._renderCategoryCard(this.state.category)
          )}
        </View>
      </Provider>
    )
  }

  _renderAddSumDialog = () => {
    return (
      <Dialog {...this.state.addSumDialog}>
        <Input
          id='addSum'
          label='Sum'
          keyboardType='decimal-pad'
          required
          autoCapitalize='none'
          errorText='Please enter a valid sum.'
          onInputChange={this.inputChangeHandler}
          initialValue=''
        />
        <View>
          <RadioButtonList
            label='Select Account'
            required
            value={this.state.userAccounts[0]?.id}
            data={this._mapAccountsToRadioButtonData()}
            onValueChange={this._changeSelectAccountHandler}
          />
        </View>
      </Dialog>
    )
  }

  _renderCategoryCard = category => {
    const icon = this._getCardIconByType(category.type)
    return  (
      <Card
        key={category.id}
        card={{
          style: styles.card
        }}
        header={{
          title: category.name,
          subtitle: category.type,
          subtitleStyle: {
            color:
              category.type === CATEGORY_TYPES.REVENUE ? Colors.blue.main : Colors.red.main
          },
          leftContainer: {
            icon
          },
          rightContainer: (
            <Text style={styles.cardHeaderRightContainer} key={category.id}>
              {category.sum}
            </Text>
          )
        }}
        buttons={{
          ok: {
            label: 'Add',
            icon: 'plus',
            mode: 'contained',
            loading: this.state.addSumDialog.buttons.ok.loading,
            onPress: this._openAddSumDialogHandler
          }
        }}
      >
        {this._renderCategoryTransactionsTable()}
      </Card>
    )
  }

  _getCardIconByType = type => {
    const osPrefix = Platform.OS === 'android' ? 'md' : 'ios'
    let name = osPrefix + '-arrow-down'
    let color = 'red'
    if (type === 'income') {
      name = osPrefix + '-arrow-up'
      color = Colors.blue.main
    }
    return { name, color }
  }

  _renderCategoryTransactionsTable = () => {
    let transactions = this.state.transactions
    let Element = !transactions ? (
      <Title style={styles.message}>Not Added transactions yet!</Title>
    ) : (
      <TransactionsDataTable
        transactions={transactions}
        transactionPagination={this.state.transactionPagination}
        changeTransactionsPage={this._changeTransactionsPage}
      />
    )

    return Element
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  card: {
    width: Dimensions.get('window').width * 0.9,
    height: Dimensions.get('window').height * 0.7
  },
  cardHeaderRightContainer: {
    paddingHorizontal: 15,
    fontSize: 26,
    fontFamily: 'open-sans-bold'
  },
  message: {
    textAlign: 'center'
  }
})
