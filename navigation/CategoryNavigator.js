import { createStackNavigator } from 'react-navigation-stack'

import defaultStackNavOptions from '../constants/configurations/defaultStackNavOptions'

import CategoriesScreen from '../screens/category/CategoriesScreen'
import AddCategoriesScreen from '../screens/category/AddCategoriesScreen'
import CategoryDetailsScreen from '../screens/category/CategoryDetailsScreen'



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



export default CategoriesNavigator
