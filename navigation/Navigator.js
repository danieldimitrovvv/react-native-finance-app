import React from 'react'
import { Platform, Text } from 'react-native'
import { createBottomTabNavigator, createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import { createDrawerNavigator } from 'react-navigation-drawer'

import { Ionicons } from '@expo/vector-icons'
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs'

import StatisticsScreen from '../screens/StatisticsScreen'
import ScanQRCodeScreen from '../screens/ScanQRCodeScreen'

import Colors from '../constants/Colors'
import UserDetailScreen from '../screens/UserDetailScreen'
import AuthScreen from '../screens/AuthScreen'
import StartupScreen from '../screens/StartupScreen'
import AccountsScreen from '../screens/account/AccountsScreen'
import AddAccountsScreen from '../screens/account/AddAccountsScreen'
import AccountDetailsScreen from '../screens/account/AccountDetailsScreen'

import CategoriesScreen from '../screens/category/CategoriesScreen'
import AddCategoriesScreen from '../screens/category/AddCategoriesScreen'
import CategoryDetailsScreen from '../screens/category/CategoryDetailsScreen'

const defaultStackNavOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === 'android' ? Colors['blue'].main : ''
  },
  headerTitleStyle: {
    fontFamily: 'open-sans-bold'
  },
  headerBackTitleStyle: {
    fontFamily: 'open-sans'
  },
  headerTintColor: Platform.OS === 'android' ? 'white' : Colors['blue'].main,
  headerTitle: 'A Screen'
}

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

const CategoriesNavigator = createStackNavigator(
  {
    Categories: CategoriesScreen,
    AddCategory: AddCategoriesScreen,
    CategoryDetails: CategoryDetailsScreen
  },
  {
    navigationOptions: {
      drawerLabel: 'Categories'
    },
    defaultNavigationOptions: defaultStackNavOptions
  }
)

const StatisticsNavigator = createStackNavigator(
  {
    Statistic: StatisticsScreen
  },
  {
    navigationOptions: {
      drawerLabel: 'Statistics'
    },
    defaultNavigationOptions: defaultStackNavOptions
  }
)

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

const tabScreenConfig = {
  Statistics: {
    screen: StatisticsNavigator,
    navigationOptions: {
      tabBarIcon: tabInfo => {
        return <Ionicons name='ios-analytics' size={25} color='white' />
      },
      tabBarColor: Colors['blue'].main,
      tabBarLabel:
        Platform.OS === 'android' ? (
          <Text style={{ fontFamily: 'open-sans-bold', color: 'white' }}>
            Statistics
          </Text>
        ) : (
          'Statistics'
        )
    }
  },
  Accounts: {
    screen: AccountsNavigator,
    navigationOptions: {
      tabBarIcon: tabInfo => {
        return <Ionicons name='ios-card' size={25} color='white' />
      },
      tabBarColor: Colors['blue'].dark,
      tabBarLabel:
        Platform.OS === 'android' ? (
          <Text style={{ fontFamily: 'open-sans-bold', color: 'white' }}>
            Accounts
          </Text>
        ) : (
          'Accounts'
        )
    }
  },
  Categories: {
    screen: CategoriesNavigator,
    navigationOptions: {
      tabBarIcon: tabInfo => {
        return <Ionicons name='ios-list' size={25} color='white' />
      },
      tabBarColor: Colors['blue'].pale,
      tabBarLabel:
        Platform.OS === 'android' ? (
          <Text style={{ fontFamily: 'open-sans-bold', color: 'white' }}>
            Categories
          </Text>
        ) : (
          'Categories'
        )
    }
  }
}

const TabNavigator =
  Platform.OS === 'android'
    ? createMaterialBottomTabNavigator(tabScreenConfig, {
        activeTintColor: 'white',
        shifting: true,
        barStyle: {
          backgroundColor: Colors['blue'].main
        }
      })
    : createBottomTabNavigator(tabScreenConfig, {
        tabBarOptions: {
          labelStyle: {
            fontFamily: 'open-sans'
          },
          activeTintColor: Colors['blue'].pale
        }
      })

const MainNavigatorSettings = {
  Startup: StartupScreen,
  TabNavigator: {
    screen: TabNavigator,
    navigationOptions: {
      drawerLabel: 'Statistics'
    }
  },
  UserDetail: UserNavigator,
  ScanQRCode: ScanQRCodeNavigator,
  Auth: AuthNavigator
}

const MainNavigator = createDrawerNavigator(MainNavigatorSettings, {
  contentOptions: {
    activeTintColor: Colors['blue'].pale,
    labelStyle: {
      fontFamily: 'open-sans-bold'
    }
  }
})

export default createAppContainer(MainNavigator)
