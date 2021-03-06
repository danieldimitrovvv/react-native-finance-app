import React from 'react'
import { StyleSheet, View, ScrollView, Platform } from 'react-native'
import { Provider } from 'react-native-paper'

import { HeaderButtons, Item } from 'react-navigation-header-buttons'

import Colors from '../../constants/Colors'

import HeaderButton from '../../components/UI/HeaderButton'
import ActivityIndicator from '../../components/UI/ActivityIndicator'
import Dialog from '../../components/UI/Dialog'
import CategoryForm from '../../components/forms/CategoryForm'
import i18n from '../../constants/configurations/config_languages'

export default class AddCategoriesScreen extends React.Component {
  static navigationOptions = navData => {
    return {
      headerTitle: i18n.t('categories'),
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
          <Item
            title={i18n.t('save')}
            iconName={Platform.OS === 'android' ? 'md-save' : 'ios-save'}
            onPress={() => navData.navigation.navigate('Categories')}
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
        buttons: { ok: { onPress: this._hideDialog, label: i18n.t('ok') } }
      },
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
            <CategoryForm {...this.props} />
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
