import { createStackNavigator } from 'react-navigation-stack'

import defaultStackNavOptions from '../constants/configurations/defaultStackNavOptions'

import AuthScreen from '../screens/AuthScreen'

const AuthNavigator = createStackNavigator(
  {
    Auth: AuthScreen
  },
  {
    navigationOptions: {
      drawerLabel: 'Logout'
    },
    defaultNavigationOptions: defaultStackNavOptions
  }
)

export default AuthNavigator
