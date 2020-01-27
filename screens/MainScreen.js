import React from 'react'
import { StyleSheet, View, BackHandler } from 'react-native'

import { HeaderButtons, Item } from 'react-navigation-header-buttons'

import Colors from '../constants/Colors'

import HeaderButton from '../components/UI/HeaderButton'
import Dialog from '../components/UI/Dialog'
import Card from '../components/UI/Card'

import UserRest from '../rests/UserRest'

export default class MainScreen extends React.Component {
  static navigationOptions = navData => {
    return {
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
      }
    }
  }
  componentDidMount () {
    this.backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      this.handleBackPress
    )
  }

  componentWillUnmount () {
    this.backHandler.remove()
  }

  handleBackPress = () => {
    this.goBack() // works best when the goBack is async
    return true
  }

  goBack = async () => {
    console.log('MAIN SCREEN', this.props.navigation)

    this.props.navigation.actions.goBack()
  }
  render () {
    return <Provider></Provider>
  }
}

const styles = StyleSheet.create({})
