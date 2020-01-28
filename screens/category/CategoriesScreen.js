import React from 'react'
import { StyleSheet, View, Platform, ScrollView } from 'react-native'
import { Provider, Text, Title, Surface, Avatar } from 'react-native-paper'

import { HeaderButtons, Item } from 'react-navigation-header-buttons'

import Colors from '../../constants/Colors'

import HeaderButton from '../../components/UI/HeaderButton'

import ActivityIndicator from '../../components/UI/ActivityIndicator'
import Dialog from '../../components/UI/Dialog'
import List from '../../components/UI/List'

import CategoryRest from '../../rests/CategoryRest'

export default class CategoriesScreen extends React.Component {
  static navigationOptions = navData => {
    return {
      headerTitle: 'Categories',
      headerStyle: {
        backgroundColor: Platform.OS === 'android' ? Colors['blue'].pale : ''
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
              console.log(navData.navigation)
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

  _mapCategories = () => {
    return this.state.categories.map(category => ({
      key: category.id,
      title: category.name,
      description: (
        <Text
          style={{
            color:
              category.type === 'income' ? Colors.blue.main : Colors.red.main
          }}
        >
          {category.type}
        </Text>
      ),
      rightContainer: category.limit ? (
        <Avatar.Text
          color='white'
          size={30}
          style={{
            backgroundColor: category.limit.includes('%')
              ? Colors.blue.main
              : Colors.blue.dark,
            width: category.limit.includes('%')
              ? +category.limit.substr(0, category.limit.length - 1) / 3 +
                10 +
                '%'
              : '25%'
          }}
          label={category.limit}
        />
      ) : null,

      leftContainer: (
        <Text style={styles.listRightContainer} key={category.id}>
          {category.sum}
        </Text>
      )
    }))
  }
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
            <ScrollView>
              <List data={this._mapCategories()} titleNumberOfLines={2}/>
            </ScrollView>
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
  },
  listRightContainer: {
    paddingHorizontal: 5,
    fontSize: 20,
    width: '25%',
    fontFamily: 'open-sans-bold'
  }
})
