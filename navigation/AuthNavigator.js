import { createStackNavigator } from 'react-navigation-stack'

import defaultStackNavOptions from '../constants/configurations/defaultStackNavOptions'

import AuthScreen from '../screens/AuthScreen'

import i18n from '../constants/configurations/config_languages'

const AuthNavigator = createStackNavigator(
  {
    Auth: AuthScreen
  },
  {
    navigationOptions: {
      drawerLabel: i18n.t('logout')
    },
    defaultNavigationOptions: defaultStackNavOptions
  }
)

export default AuthNavigator
