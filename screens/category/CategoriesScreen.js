import React from 'react'
import { StyleSheet, View, Platform } from 'react-native'
import { Provider, Title } from 'react-native-paper'

import { HeaderButtons, Item } from 'react-navigation-header-buttons'

import HeaderButton from '../../components/UI/HeaderButton'

import ActivityIndicator from '../../components/UI/ActivityIndicator'
import Dialog from '../../components/UI/Dialog'

import CategoriesList from '../../components/dataLists/CategoriesList'

import CategoryRest from '../../rests/CategoryRest'

export default class CategoriesScreen extends React.Component {
  static navigationOptions = navData => {
    return {
      headerTitle: 'Categories',
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
              navData.navigation.navigate('AddCategory')
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
      categories: []
    }
  }

  componentDidMount () {
    this.setState({ isLoading: true })
    CategoryRest.getCategories()
      .then(categories => {
        this.setState({ categories, isLoading: false })
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
          ) : this.state.categories.length === 0 ? (
            <Title>Not Added categories yet!</Title>
          ) : (
            <CategoriesList
              categories={this.state.categories}
              navigation={this.props.navigation}
            />
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
    height: '100%'
  }
})
