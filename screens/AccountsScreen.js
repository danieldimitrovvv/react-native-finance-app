import React from 'react'
import { StyleSheet, View, ScrollView, Platform } from 'react-native'
import { Provider, Surface, Text, ActivityIndicator } from 'react-native-paper'

import { HeaderButtons, Item } from 'react-navigation-header-buttons'

import Colors from '../constants/Colors'

import HeaderButton from '../components/UI/HeaderButton'
import Dialog from '../components/UI/Dialog'
import Card from '../components/UI/Card'

import UserRest from '../rests/UserRest'
import MainScreen from './MainScreen'
import AccountRest from '../rests/AccountRest'

export default class AccountsScreen extends MainScreen {
  static navigationOptions = navData => {
   
    return {
      ...super.navigationOptions(navData),
      headerTitle: 'Accounts',
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
          <Item
            title='Add'
            iconName={Platform.OS === 'android' ? 'md-add' : 'ios-add'}
            onPress={() => {
              console.log(navData.navigation)
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
      ...super.constructor().state,
      accounts: []
    }
    console.log('ACCOUNT STATE:', this.state)
  }

  componentDidMount () {
    super.componentDidMount()
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
            <ActivityIndicator animating={true} size='large' />
          ) : this.state.accounts.length === 0 ? (
            <Text>Not Added accounts yet!</Text>
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
