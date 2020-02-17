import React from 'react'
import { Platform, Text } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

import Colors from '../Colors'
import StatisticsNavigator from '../../navigation/StatisticsNavigator'
import AccountsNavigator from '../../navigation/AccountNavigator'
import CategoriesNavigator from '../../navigation/CategoryNavigator'
import i18n from './config_languages'

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
            {i18n.t('statistics')}
          </Text>
        ) : (
          i18n.t('statistics')
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
            {i18n.t('accounts')}
          </Text>
        ) : (
          i18n.t('statistics')
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
            {i18n.t('categories')}
          </Text>
        ) : (
          i18n.t('categories')
        )
    }
  }
}

export default tabScreenConfig
