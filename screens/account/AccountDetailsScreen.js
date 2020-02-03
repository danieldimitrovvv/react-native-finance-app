import React from 'react'
import {
  StyleSheet,
  View,
  Platform,
  Dimensions
} from 'react-native'
import { Provider, Title, Text } from 'react-native-paper'

import Colors from '../../constants/Colors'

import ActivityIndicator from '../../components/UI/ActivityIndicator'
import Dialog from '../../components/UI/Dialog'
import Card from '../../components/UI/Card'

import AccountRest from '../../rests/AccountRest'
import TransactionRest from '../../rests/TransactionRest'
import TransactionsDataTable from '../../components/dataTables/TransactionsDataTable'
import UsersDataTable from '../../components/dataTables/UsersDataTable'


export default class AccountDetailsScreen extends React.Component {
  static navigationOptions = navData => {
    return {
      headerTitle: navData.navigation.getParam('accountTitle'),
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
      accountId: null,
      account: null,
      transactions: null,
      transactionPagination: {
        page: 0,
        numberOfTransactions: 10,
        numberOfPages: 3
      },
      show: 't'
    }
  }

  componentDidMount () {
    const accountId = +this.props.navigation.getParam('accountId')
    this.setState({ isLoading: true, accountId })
    AccountRest.getAccountById(accountId).then(account => {
      this.setState({ isLoading: false, account })
      this._getTransactions()
    })
  }

  _hideDialog = () =>
    this.setState(state => ({ dialog: { ...state.dialog, visible: false } }))

  _changeTransactionsPage = page => {
    this.setState(state => ({
      transactionPagination: {
        ...state.transactionPagination,
        page
      }
    }))
    this._getTransactions()
  }

  _getTransactions = () => {
    let { page, numberOfTransactions } = this.state.transactionPagination
    const categoryId = +this.props.navigation.getParam('accountId')

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

  render () {
    return (
      <Provider>
        <View style={styles.container}>
          <Dialog {...this.state.dialog} />
          {this.state.isLoading ? (
            <ActivityIndicator />
          ) : !this.state.accountId ? (
            <Title>Not Added account yet!</Title>
          ) : (
            this._renderAccountCard(this.state.account)
          )}
        </View>
      </Provider>
    )
  }

  _renderAccountCard = account => {
    return account.type !== 'deleted' ? (
      <Card
        key={account.id}
        card={{
          style: styles.card
        }}
        header={{
          title: account.name,
          subtitle: account.type,
          subtitleStyle: {
            color:
              account.type === 'activated' ? Colors.blue.main : Colors.red.main
          },
          leftContainer: {
            avatar: true,
            icon: { name: 'ios-card' }
          },
          rightContainer: (
            <Text style={styles.cardHeaderRightContainer} key={account.id}>
              {account.availability}
            </Text>
          )
        }}
        buttons={{
          ok: {
            label: ' ',
            icon: 'account',
            mode: 'contained',
            disabled: this.state.show === 'u',
            style: { marginHorizontal: 8 },
            onPress: () => this.setState({ show: 'u' })
          },
          cancel: {
            label: ' ',
            icon: 'bank-transfer',
            mode: 'contained',
            disabled: this.state.show === 't',
            onPress: () => this.setState({ show: 't' })
          }
        }}
      >
        {this.state.show === 't'
          ? this._renderAccountTransactionsTable()
          : this._renderAccountSharedUsersTable()}
      </Card>
    ) : (
      <Title style={styles.message}>Not Existing account!</Title>
    )
  }

  _renderAccountTransactionsTable = () => {
    const transactions = this.state.transactions
    const Element = !transactions ? (
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

  _renderAccountSharedUsersTable = () => {
    const sharedList = this.state.account.sharedList
    const Element = !sharedList ? (
      <Title style={styles.message}>Not Added users yet!</Title>
    ) : (
      <UsersDataTable users={sharedList} />
    )
    return Element
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height:'100%',
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
