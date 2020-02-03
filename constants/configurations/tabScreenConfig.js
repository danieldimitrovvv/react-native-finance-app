import React from 'react'
import { Platform, Text } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

import Colors from '../Colors'
import StatisticsNavigator from '../../navigation/StatisticsNavigator'
import AccountsNavigator from '../../navigation/AccountNavigator'
import CategoriesNavigator from '../../navigation/CategoryNavigator'


const tabScreenConfig = {
  Statistics: {
    screen: StatisticsNavigator,
    navigationOptions: {
      tabBarIcon: tabInfo => {
        return <Ionicons name='ios-analytics' size={25} color='white' />
      },
      tabBarColor: Colors.blue.main,
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
      tabBarColor: Colors.blue.main,
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
      tabBarColor: Colors.blue.main,
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

export default tabScreenConfig