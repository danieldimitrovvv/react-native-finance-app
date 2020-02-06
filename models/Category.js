const REVENUE = 'revenue'
const EXPENSE = 'expense'

const CATEGORY_TYPES = {
  REVENUE,
  EXPENSE
}

class Category {
  constructor (id, userId, name, type, sum, limit) {
    this.id = id
    this.userId = userId
    this.name = name
    this.type = type
    this.sum = sum
    this.limit = limit
  }
}

export { CATEGORY_TYPES }
export default Category
