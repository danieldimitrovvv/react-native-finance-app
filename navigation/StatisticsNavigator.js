import { createStackNavigator } from 'react-navigation-stack'

import defaultStackNavOptions from '../constants/configurations/defaultStackNavOptions'

import StatisticsScreen from '../screens/StatisticsScreen'
import i18n from '../constants/configurations/config_languages'

const StatisticsNavigator = createStackNavigator(
  {
    Statistic: StatisticsScreen
  },
  {
    navigationOptions: {
      drawerLabel: i18n.t('statistics')
    },
    defaultNavigationOptions: defaultStackNavOptions
  }
)

export default StatisticsNavigator
