import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Provider, Surface, Text, Title } from 'react-native-paper'

import { HeaderButtons, Item } from 'react-navigation-header-buttons'

import ScannerQRCode from '../components/ScannerQRCode'
import HeaderButton from '../components/UI/HeaderButton'
import Dialog from '../components/UI/Dialog'
import RadioButtonList from '../components/UI/RadioButtonList'

import ColorRest from '../rests/ColorRest'
import AccountRest from '../rests/AccountRest'

import CategoryRest from '../rests/CategoryRest'

export default class ScanQRCodeScreen extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      theme: 'blue',
      isLoading: false,
      addScanSumDialog: {
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
      userAccounts: [],
      selectedCategoryID: null,
      selectedAccountID: null,
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
    this.setState(state => ({
      addScanSumDialog: { ...state.addScanSumDialog, visible: false }
    }))

  _addSumToCategory = () => {
    const categoryId = this.state.selectedCategoryID
    // Account subtraction
    CategoryRest.addSum(categoryId, this.state.scanData.sum).then(
      updateCategory => {
        const updateCategories = this.state.userCategories
        updateCategories[categoryId] = updateCategory
        this.setState({ userCategories: updateCategories })
        this._hideDialog()
      }
    )
  }

  _submitCardHandler = (date, time, sum) => {
    this.setState({ isLoading: true, scanData: { date, time, sum: +sum } })
    CategoryRest.getCategories().then(categories => {
      AccountRest.getAccounts().then(accounts => {
        this.setState(state => ({
          isLoading: false,
          addScanSumDialog: {
            ...state.addScanSumDialog,
            title: sum,
            visible: true
          },
          userAccounts: accounts,
          userCategories: categories
        }))
      })
    })
  }

  _changeSelectCategoryHandler = value =>
    this.setState({ selectedCategoryID: value })

  _mapCategoriesToRadioButtonData = () =>
    this.state.userCategories.map(cat => ({ title: cat.name, value: cat.id }))

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
        <Surface style={styles.scannerContainer}>
          {this._renderAddSumDialog()}
          <ScannerQRCode
            resultCard={{
              title: 'Added to category',
              icon: 'plus',
              onPress: this._submitCardHandler
            }}
          />
        </Surface>
      </Provider>
    )
  }

  _renderAddSumDialog = () => {
    return (
      <Dialog {...this.state.addScanSumDialog}>
        {/* <ScrollView> */}
        <View>
          <RadioButtonList
            label='Select Category'
            required
            value={this.state.userCategories[0]?.id}
            data={this._mapCategoriesToRadioButtonData()}
            onValueChange={this._changeSelectCategoryHandler}
          />
        </View>
        <View>
          <RadioButtonList
            label='Select Account'
            required
            value={this.state.userAccounts[0]?.id}
            data={this._mapAccountsToRadioButtonData()}
            onValueChange={this._changeSelectAccountHandler}
          />
        </View>
        {/* </ScrollView> */}
      </Dialog>
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
