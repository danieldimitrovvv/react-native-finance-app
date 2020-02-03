import { createStackNavigator } from 'react-navigation-stack'

import defaultStackNavOptions from '../constants/configurations/defaultStackNavOptions'

import StatisticsScreen from '../screens/StatisticsScreen'

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

export default StatisticsNavigator
