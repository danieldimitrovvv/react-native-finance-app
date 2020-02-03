import { createStackNavigator } from 'react-navigation-stack'

import defaultStackNavOptions from '../constants/configurations/defaultStackNavOptions'

import ScanQRCodeScreen from '../screens/ScanQRCodeScreen'




const ScanQRCodeNavigator = createStackNavigator(
  {
    ScanQRCode: ScanQRCodeScreen
  },
  {
    navigationOptions: {
      drawerLabel: 'Scan QR Code'
    },
    defaultNavigationOptions: defaultStackNavOptions
  }
)

export default ScanQRCodeNavigator
