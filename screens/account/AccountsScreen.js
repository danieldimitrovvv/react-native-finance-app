import React from 'react'
import { StyleSheet, View, ScrollView, Platform } from 'react-native'
import { Provider, Text, Title } from 'react-native-paper'

import { HeaderButtons, Item } from 'react-navigation-header-buttons'

import Colors from '../../constants/Colors'

import HeaderButton from '../../components/UI/HeaderButton'

import ActivityIndicator from '../../components/UI/ActivityIndicator'
import Dialog from '../../components/UI/Dialog'
import Card from '../../components/UI/Card'

import AccountRest from '../../rests/AccountRest'

export default class AccountsScreen extends React.Component {
  static navigationOptions = navData => {
    return {
      headerTitle: 'Accounts',
      headerStyle: {
        backgroundColor: Platform.OS === 'android' ? Colors['blue'].dark : ''
      },
      headerLeft: () => (
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
          <Item
            title='Menu'
            iconName='ios-menu'
            onPress={() => {
              navData.navigation.toggleDrawer()
            }}
          />
        </HeaderButtons>
      ),
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
          <Item
            title='Add'
            iconName={Platform.OS === 'android' ? 'md-add' : 'ios-add'}
            onPress={() => {
              navData.navigation.navigate('AddAccount')
            }}
          />
        </HeaderButtons>
      )
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
      accounts: []
    }
  }

  componentDidMount () {
    this.setState({ isLoading: true })
    AccountRest.getAccounts()
      .then(accounts => {
        this.setState({ accounts, isLoading: false })
      })
      .catch(error =>
        this.setState(state => ({
          dialog: {
            ...state.dialog,
            message: error,
            visible: true
          }
        }))
      )
  }

  _hideDialog = () =>
    this.setState(state => ({ dialog: { ...state.dialog, visible: false } }))

  render () {
    return (
      <Provider>
        <View style={styles.container}>
          <Dialog {...this.state.dialog} />
          {this.state.isLoading ? (
            <ActivityIndicator />
          ) : this.state.accounts.length === 0 ? (
            <Title>Not Added accounts yet!</Title>
          ) : (
            <ScrollView>
              {this.state.accounts.map(account =>
                this._renderAccountCard(account)
              )}
            </ScrollView>
          )}
        </View>
      </Provider>
    )
  }

  _renderAccountCard = account => {
    return account.type !== 'deleted' ? (
      <Card
        key={account.id}
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
      />
    ) : null
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%'
  },
  cardHeaderRightContainer: {
    paddingHorizontal: 15,
    fontSize: 26,
    fontFamily: 'open-sans-bold'
  }
})
