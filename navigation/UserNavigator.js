import { createStackNavigator } from 'react-navigation-stack'

import defaultStackNavOptions from '../constants/configurations/defaultStackNavOptions'

import UserDetailScreen from '../screens/UserDetailScreen'

const UserNavigator = createStackNavigator(
  {
    UserDetail: UserDetailScreen
  },
  {
    navigationOptions: {
      drawerLabel: 'My Profile'
    },
    defaultNavigationOptions: defaultStackNavOptions
  }
)

export default UserNavigator
