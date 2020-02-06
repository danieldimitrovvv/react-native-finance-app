import Category, { CATEGORY_TYPES } from '../../models/Category'

export default [
  new Category(1, 1, 'cat 1', CATEGORY_TYPES.REVENUE, 0, null),
  new Category(2, 1, 'cat 2',  CATEGORY_TYPES.REVENUE, 100, null),
  new Category(3, 1, 'cat 3',  CATEGORY_TYPES.EXPENSE, 200, '300'),
  new Category(4, 1, 'cat 4',  CATEGORY_TYPES.EXPENSE, 300, '30%'),
  new Category(1, 4, 'cat 1',  CATEGORY_TYPES.REVENUE, 0, null),
  new Category(2, 4, 'cat 2',  CATEGORY_TYPES.REVENUE, 100, null),
  new Category(3, 4, 'cat 3',  CATEGORY_TYPES.EXPENSE, 200, '30000'),
  new Category(4, 4, 'cat 4',  CATEGORY_TYPES.EXPENSE, 300, '30%'),
  new Category(5, 4, 'cat 5',  CATEGORY_TYPES.EXPENSE, 300, '40%'),
  new Category(6, 4, 'cat 6',  CATEGORY_TYPES.EXPENSE, 300000, '65%'),
  new Category(7, 4, 'cat 7',  CATEGORY_TYPES.EXPENSE, 300, '15%'),
  new Category(8, 4, 'cat 8',  CATEGORY_TYPES.REVENUE, 300, '60%'),
  new Category(9, 4, 'cat ca \t cat 9',  CATEGORY_TYPES.REVENUE, 3000000, '100%'),
  new Category(10, 4, 'cat 10',  CATEGORY_TYPES.EXPENSE, 300, '40%')
]
