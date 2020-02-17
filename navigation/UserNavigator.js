import { createStackNavigator } from 'react-navigation-stack'

import defaultStackNavOptions from '../constants/configurations/defaultStackNavOptions'

import UserDetailScreen from '../screens/UserDetailScreen'
import i18n from '../constants/configurations/config_languages'

const UserNavigator = createStackNavigator(
  {
    UserDetail: UserDetailScreen
  },
  {
    navigationOptions: {
      drawerLabel: i18n.t('my_profile')
    },
    defaultNavigationOptions: defaultStackNavOptions
  }
)

export default UserNavigator
