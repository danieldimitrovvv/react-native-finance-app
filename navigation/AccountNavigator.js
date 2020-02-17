import { createStackNavigator } from 'react-navigation-stack'

import defaultStackNavOptions from '../constants/configurations/defaultStackNavOptions'

import AccountsScreen from '../screens/account/AccountsScreen'
import AddAccountsScreen from '../screens/account/AddAccountsScreen'
import AccountDetailsScreen from '../screens/account/AccountDetailsScreen'

import i18n from '../constants/configurations/config_languages'

const AccountsNavigator = createStackNavigator(
  {
    Accounts: AccountsScreen,
    AddAccount: AddAccountsScreen,
    AccountDetails: AccountDetailsScreen
  },
  {
    navigationOptions: {
      drawerLabel: i18n.t('accounts')
    },
    defaultNavigationOptions: defaultStackNavOptions
  }
)


export default AccountsNavigator
