import { createStackNavigator } from 'react-navigation-stack'

import defaultStackNavOptions from '../constants/configurations/defaultStackNavOptions'

import ScanQRCodeScreen from '../screens/ScanQRCodeScreen'

import i18n from '../constants/configurations/config_languages'

const ScanQRCodeNavigator = createStackNavigator(
  {
    ScanQRCode: ScanQRCodeScreen
  },
  {
    navigationOptions: {
      drawerLabel: i18n.t('scan_qr_code')
    },
    defaultNavigationOptions: defaultStackNavOptions
  }
)

export default ScanQRCodeNavigator
