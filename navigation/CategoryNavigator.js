import { createStackNavigator } from 'react-navigation-stack'

import defaultStackNavOptions from '../constants/configurations/defaultStackNavOptions'

import CategoriesScreen from '../screens/category/CategoriesScreen'
import AddCategoriesScreen from '../screens/category/AddCategoriesScreen'
import CategoryDetailsScreen from '../screens/category/CategoryDetailsScreen'
import i18n from '../constants/configurations/config_languages'



const CategoriesNavigator = createStackNavigator(
  {
    Categories: CategoriesScreen,
    AddCategory: AddCategoriesScreen,
    CategoryDetails: CategoryDetailsScreen
  },
  {
    navigationOptions: {
      drawerLabel: i18n.t('categories')
    },
    defaultNavigationOptions: defaultStackNavOptions
  }
)



export default CategoriesNavigator
