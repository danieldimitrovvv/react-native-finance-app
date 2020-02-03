import { createStackNavigator } from 'react-navigation-stack'

import defaultStackNavOptions from '../constants/configurations/defaultStackNavOptions'

import AccountsScreen from '../screens/account/AccountsScreen'
import AddAccountsScreen from '../screens/account/AddAccountsScreen'
import AccountDetailsScreen from '../screens/account/AccountDetailsScreen'

const AccountsNavigator = createStackNavigator(
  {
    Accounts: AccountsScreen,
    AddAccount: AddAccountsScreen,
    AccountDetails: AccountDetailsScreen
  },
  {
    navigationOptions: {
      drawerLabel: 'Accounts'
    },
    defaultNavigationOptions: defaultStackNavOptions
  }
)


export default AccountsNavigator
