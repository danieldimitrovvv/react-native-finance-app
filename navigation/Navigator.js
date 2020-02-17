import {  createAppContainer } from 'react-navigation'
import { createDrawerNavigator } from 'react-navigation-drawer'

import Colors from '../constants/Colors'

import StartupScreen from '../screens/StartupScreen'

import TabNavigator from './TabNavigator'
import UserNavigator from './UserNavigator'
import ScanQRCodeNavigator from './ScanQRCodeNavigator'
import AuthNavigator from './AuthNavigator'
import i18n from '../constants/configurations/config_languages'

const MainNavigatorSettings = {
  Startup: StartupScreen,
  TabNavigator: {
    screen: TabNavigator,
    navigationOptions: {
      drawerLabel: i18n.t('statistics')
    }
  },
  UserDetail: UserNavigator,
  ScanQRCode: ScanQRCodeNavigator,
  Auth: AuthNavigator
}

const MainNavigator = createDrawerNavigator(MainNavigatorSettings, {
  contentOptions: {
    activeTintColor: Colors.blue.pale,
    labelStyle: {
      fontFamily: 'open-sans-bold'
    }
  }
})

export default createAppContainer(MainNavigator)
