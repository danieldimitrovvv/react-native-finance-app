import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Provider, Surface, Text } from 'react-native-paper'

import { HeaderButtons, Item } from 'react-navigation-header-buttons'

import ScannerQRCode from '../components/ScannerQRCode'
import HeaderButton from '../components/UI/HeaderButton'
import Dialog from '../components/UI/Dialog'
import RadioButtonList from '../components/UI/RadioButtonList'

import ColorRest from '../rests/ColorRest'
import UserRest from '../rests/UserRest'
import CategoryRest from '../rests/CategoryRest'

export default class ScanQRCodeScreen extends React.Component {
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
        buttons: {
          ok: { onPress: this._addSumToCategory, label: 'ok' },
          cancel: { onPress: this._hideDialog, label: 'Cancel' }
        }
      },
      userCategories: [],
      selectedCategoryID: null,
      scanData: {
        date: null,
        time: null,
        sum: null
      }
    }
  }

  componentDidMount () {
    this.setState({ isLoading: true })
    ColorRest.getTheme().then(theme =>
      this.setState({ theme, isLoading: false })
    )
  }

  _hideDialog = () =>
    this.setState(state => ({ dialog: { ...state.dialog, visible: false } }))

  _addSumToCategory = () => {
    const categoryId = this.state.selectedCategoryID
    console.log(categoryId)
    CategoryRest.addSum(categoryId, this.state.scanData.sum).then(
      updateCategory => {
        const updateCategories = this.state.userCategories
        updateCategories[categoryId] = updateCategory
        this.setState({ userCategories: updateCategories })
        this._hideDialog()
        console.log(this.state.userCategories)
      }
    )
  }

  _submitCardHandler = (date, time, sum) => {
    this.setState({ scanData: { date, time, sum: +sum } })
    CategoryRest.getCategories().then(categories => {
      this.setState(state => ({
        dialog: {
          ...state.dialog,
          title: sum,
          visible: true
        },
        userCategories: categories
      }))
    })
  }

  _changeSelectCategoryHandler = value =>
    this.setState({ selectedCategoryID: value })

  _mapCategoriesToRadioButtonData = () =>
    this.state.userCategories.map(cat => ({ title: cat.name, value: cat.id }))

  render () {
    return (
      <Provider>
        <Surface style={styles.scannerContainer}>
          <Dialog {...this.state.dialog}>
            <RadioButtonList
              data={this._mapCategoriesToRadioButtonData()}
              onValueChange={this._changeSelectCategoryHandler}
            />
          </Dialog>
          <ScannerQRCode
            resultCard={{
              title: 'added to category',
              icon: 'plus',
              onPress: this._submitCardHandler
            }}
          />
        </Surface>
      </Provider>
    )
  }
}

ScanQRCodeScreen.navigationOptions = navData => {
  return {
    headerTitle: 'Scan QR Code',
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

const styles = StyleSheet.create({
  scannerContainer: {
    flex: 1,
    width: '100%',
    height: '80%',
    paddingVertical: 30
  }
})
