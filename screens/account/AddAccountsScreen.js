import React from 'react'
import { StyleSheet, View, ScrollView, Platform } from 'react-native'
import { Provider } from 'react-native-paper'

import { HeaderButtons, Item } from 'react-navigation-header-buttons'

import Colors from '../../constants/Colors'

import HeaderButton from '../../components/UI/HeaderButton'
import ActivityIndicator from '../../components/UI/ActivityIndicator'
import Dialog from '../../components/UI/Dialog'
import AccountForm from '../../components/forms/AccountForm'

export default class AddAccountsScreen extends React.Component {
  static navigationOptions = navData => {
    return {
      headerTitle: 'Accounts',
      headerStyle: {
        backgroundColor: Platform.OS === 'android' ? Colors['blue'].dark : ''
      },
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
      theme: 'blue',
      isLoading: false,
      dialog: {
        visible: false,
        message: null,
        title: null,
        onDismiss: this._hideDialog,
        buttons: { ok: { onPress: this._hideDialog, label: 'ok' } }
      },
      account: null
    }
  }

  componentDidMount () {}

  _hideDialog = () =>
    this.setState(state => ({ dialog: { ...state.dialog, visible: false } }))

  render () {
    return (
      <Provider>
        <View style={styles.container}>
          <Dialog {...this.state.dialog} />
          {this.state.isLoading ? (
            <ActivityIndicator />
          ) : (
            <AccountForm {...this.props} />
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
