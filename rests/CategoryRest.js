import AuthRest from './AuthRest'
import Categories from '../constants/storage/categories'
import MainRest from './MainRest'
import Category from '../models/Category'

class CategoryRest extends MainRest {
  //income and expense
  //activated, deactivated, deleted

  categories = Categories

  constructor () {
    super()
  }

  getCategories = () => {
    const userID = AuthRest.getAuthUserId()
    let userCategories = this.categories.filter(u => u.userId == userID)
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (userCategories) resolve(userCategories)
        else reject('Please login?')
      }, 300)
    })
  }

  add (name, type, limit) {
    const id = (new Date().getTime() * new Date().getTime()) / 13
    const userID = AuthRest.getAuthUserId()
    this.accounts.push(new Category(id, userID, name, type, 0, limit))

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (id) resolve(id)
        else reject('Please login?')
      }, 300)
    })
  }

  addSum = (categoryID, sum) => {
    const updateCategoryIndex = this.categories.findIndex(
      cat => cat.id == categoryID
    )
    const updateCategory = {
      ...this.categories[updateCategoryIndex]
    }
    updateCategory.sum += sum
    this.categories[updateCategoryIndex] = updateCategory
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(updateCategory)
      }, 300)
    })
  }
}

export default new CategoryRest()
