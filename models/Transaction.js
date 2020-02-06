const REVENUE = 'revenue'
const EXPENSE = 'expense'
const TRANSFER = 'transfer'

const ACCOUNT = 'account'
const CATEGORY = 'category'

const DAYS = 'd'
const WEEKS = 'w'
const MONTHS = 'm'
const YEARS = 'y'

const TRANSACTION_TYPES = { REVENUE, EXPENSE, TRANSFER }

const FROM_TO_TYPES = { ACCOUNT, CATEGORY }

const PERIOD_TYPES = { DAYS, WEEKS, MONTHS, YEARS }

class Transaction {
  constructor (
    id,
    userId,
    dateOfCompletion,
    fromId,
    toId,
    fromType,
    toType,
    type,
    sum,
    recurring,
    description,
    shouldBeAutomaticallyExecuted
  ) {
    this.id = id
    this.userId = userId
    this.dateOfCompletion = dateOfCompletion
    this.fromId = fromId
    this.toId = toId
    this.fromType = fromType
    this.toType = toType
    this.type = type
    this.sum = sum
    this.recurring = recurring
    this.description = description
    this.shouldBeAutomaticallyExecuted = shouldBeAutomaticallyExecuted
  }
}

export { TRANSACTION_TYPES, FROM_TO_TYPES, PERIOD_TYPES }
export default Transaction
