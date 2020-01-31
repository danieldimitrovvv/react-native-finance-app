import React from 'react'
import {
  StyleSheet,
  View,
  ScrollView,
  Platform,
  Dimensions
} from 'react-native'
import { Provider, Title, Text, DataTable } from 'react-native-paper'
import { Ionicons } from '@expo/vector-icons'

import Colors from '../../constants/Colors'

import ActivityIndicator from '../../components/UI/ActivityIndicator'
import Dialog from '../../components/UI/Dialog'
import Card from '../../components/UI/Card'
import Input from '../../components/UI/Input'

import CategoryRest from '../../rests/CategoryRest'
import TransactionRest from '../../rests/TransactionRest'
import formatDate from '../../components/FormatDate'

export default class CategoryDetailsScreen extends React.Component {
  static navigationOptions = navData => {
    return {
      headerTitle: navData.navigation.getParam('categoryTitle'),
      headerStyle: {
        backgroundColor: Platform.OS === 'android' ? Colors['blue'].dark : ''
      }
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
        message: null,
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
          ok: { ...state.addSumDialog.buttons.ok, disabled: !inputValidity }
        }
      }
    }))
  }

  _addSum = () => {
    this._changeAddSumDialogOkBtnLoading(true)

    CategoryRest.addSum(this.state.categoryId, this.state.addSum.value).then(
      _ => {
        this._changeAddSumDialogOkBtnLoading(false)
        this._hideAddSumDialog()
      }
    )
  }

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
          keyboardType='number-pad'
          required
          autoCapitalize='none'
          errorText='Please enter a valid sum.'
          onInputChange={this.inputChangeHandler}
          initialValue=''
        />
      </Dialog>
    )
  }

  _renderCategoryCard = category => {
    const icon = this._getCardIconByType(category.type)
    return category.type !== 'deleted' ? (
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
              category.type === 'income' ? Colors.blue.main : Colors.red.main
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
            onPress: () =>
              this.setState(state => ({
                addSumDialog: {
                  ...state.addSumDialog,
                  visible: true
                }
              }))
          }
        }}
      >
        {this._renderCategoryTransactionsTable()}
      </Card>
    ) : (
      <Title style={styles.message}>Not Added category yet!</Title>
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
      <DataTable style={styles.dataTable}>
        <DataTable.Header>
          <DataTable.Title>Date</DataTable.Title>
          <DataTable.Title>$</DataTable.Title>
          <DataTable.Title numeric></DataTable.Title>
        </DataTable.Header>
        <ScrollView style={styles.dataTableRows}>
          {transactions.map(t => (
            <DataTable.Row>
              <DataTable.Cell>
                <Text>{formatDate(t.dateOfCompletion)}</Text>
              </DataTable.Cell>
              <DataTable.Cell>{t.sum}</DataTable.Cell>
              <DataTable.Cell numeric>
                {this._renderTransferTypeIcon(t.type)}
              </DataTable.Cell>
            </DataTable.Row>
          ))}
        </ScrollView>
        {this.state.transactionPagination.numberOfPages > 1 && (
          <DataTable.Pagination
            page={this.state.transactionPagination.page}
            numberOfPages={this.state.transactionPagination.numberOfPages}
            onPageChange={this._changeTransactionsPage}
            label={
              this.state.transactionPagination.page +
              1 +
              ' of ' +
              this.state.transactionPagination.numberOfPages
            }
          />
        )}
      </DataTable>
    )

    return Element
  }

  _renderTransferTypeIcon = type => {
    //income expense transfer
    let name = null
    let color = 'black'

    if (type === 'income') {
      name = Platform.OS === 'android' ? 'md-arrow-up' : 'ios-arrow-up'
      color = Colors.blue.main
    } else if (type === 'expense') {
      name = Platform.OS === 'android' ? 'md-arrow-down' : 'ios-arrow-down'

      color = Colors.red.main
    } else {
      name = Platform.OS === 'android' ? 'md-sync' : 'ios-sync'
      color = Colors.blue.dark
    }
    return <Ionicons name={name} size={25} color={color} />
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
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
  dataTable: {
    height: Dimensions.get('window').height < 650 ? '70%' : '85%'
  },
  dataTableRows: {
    height: '70%'
  },
  message: {
    textAlign: 'center'
  }
})
