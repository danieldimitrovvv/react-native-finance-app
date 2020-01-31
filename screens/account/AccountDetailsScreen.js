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

import AccountRest from '../../rests/AccountRest'
import TransactionRest from '../../rests/TransactionRest'
import formatDate from '../../components/FormatDate'

export default class AccountDetailsScreen extends React.Component {
  static navigationOptions = navData => {
    return {
      headerTitle: navData.navigation.getParam('accountTitle'),
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
      <Title style={styles.message}>Not Added account yet!</Title>
    )
  }

  _renderAccountTransactionsTable = () => {
    const transactions = this.state.transactions
    const Element = !transactions ? (
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

  _renderAccountSharedUsersTable = () => {
    const sharedList = this.state.account.sharedList
    const Element = !sharedList ? (
      <Title style={styles.message}>Not Added users yet!</Title>
    ) : (
      <DataTable style={styles.dataTable}>
        <DataTable.Header>
          <DataTable.Title>Name</DataTable.Title>
          <DataTable.Title>Email</DataTable.Title>
          <DataTable.Title numeric>Years</DataTable.Title>
        </DataTable.Header>
        <ScrollView style={styles.dataTableRows}>
          {sharedList.map(u => (
            <DataTable.Row>
              <DataTable.Cell>{u.name}</DataTable.Cell>
              <DataTable.Cell>{u.email}</DataTable.Cell>
              <DataTable.Cell numeric>{u.age ? u.age : '-'}</DataTable.Cell>
            </DataTable.Row>
          ))}
        </ScrollView>
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
