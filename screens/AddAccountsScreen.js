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
import AccountForm from '../components/forms/AccountForm'

export default class AddAccountsScreen extends MainScreen {
  static navigationOptions = navData => {
    return {
      // ...super.navigationOptions(navData),
      headerTitle: 'Accounts',
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
          <Item
            title='Save'
            iconName={Platform.OS === 'android' ? 'md-save' : 'ios-save'}
            onPress={() => navData.navigation.navigate('Accounts')}
          />
        </HeaderButtons>
      )
    }
  }

  constructor (props) {
    super(props)
    this.state = {
      ...super.constructor().state,
      account: null
    }
  }

  componentDidMount () {
    super.componentDidMount()
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
          ) : (
              <AccountForm {...this.props}/>
          )}
        </View>
      </Provider>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  }
})
