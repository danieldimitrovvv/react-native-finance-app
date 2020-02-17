import React, { useEffect, useState, useCallback } from 'react'
import { StyleSheet, Platform, Alert } from 'react-native'
import {
  Surface,
  ActivityIndicator,
  DataTable,
  Provider
} from 'react-native-paper'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'

import HeaderButton from '../components/UI/HeaderButton'
import LoginForm from '../components/forms/LoginForm'
import RegisterForm from '../components/forms/RegisterForm'
import i18n from '../constants/configurations/config_languages'

const AuthScreen = props => {
  const [isLoginForm, setIsLoginForm] = useState(true)
  const [isLoading, setIsLoading] = useState(false)

  const changeFormHandler = useCallback(() => {
    setIsLoginForm(!isLoginForm)
  }, [isLoginForm, setIsLoginForm])

  useEffect(() => {
    props.navigation.setParams({ changeFormFn: changeFormHandler })
    props.navigation.setParams({ btnLabel: isLoginForm ? i18n.t('login') : i18n.t('signup') })
  }, [changeFormHandler])

  return (
    <Provider>
      <Surface style={styles.container}>
        {isLoading ? (
          <ActivityIndicator />
        ) : isLoginForm ? (
          <LoginForm {...props} changeFormHandler={changeFormHandler} />
        ) : (
          <RegisterForm {...props} changeFormHandler={changeFormHandler} />
        )}
      </Surface>
    </Provider>
  )
}

AuthScreen.navigationOptions = navData => {
  const changeFormFn = navData.navigation.getParam('changeFormFn')
  const btnLabel = navData.navigation.getParam('btnLabel')
  return {
    headerTitle: btnLabel,
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title={btnLabel}
          iconName={Platform.OS === 'android' ? 'md-switch' : 'ios-switch'}
          onPress={changeFormFn}
        />
      </HeaderButtons>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 30
  }
})

export default AuthScreen
