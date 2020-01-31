import Transaction from '../../models/Transaction'
import Users from './users'
import Categories from './categories'
import Accounts from './accounts'

const PERIOD_TYPES = ['d', 'w', 'm', 'y']
const numberTransactions = 1000

const seedTransactions = () => {
  let transactions = []
  for (let index = 0; index < numberTransactions; index++) {
    const date = getRandomDate(
      getNumberBetween(1, 100),
      getNumberBetween(0, 1) === 0 ? true : false
    )

    let userId = getRandomArrayElement(Users).id
    const [
      fromId,
      toId,
      fromType,
      toType,
      type,
      description
    ] = getTransactionFromToData()
    transactions.push(
      new Transaction(
        getId(),
        userId,
        date,
        fromId,
        toId,
        fromType,
        toType,
        type,
        getNumberBetween(10, 999999),
        getNumberBetween(0, 1) === 0
          ? JSON.stringify(getRecurringData())
          : null,
        description,
        getNumberBetween(0, 1) === 0 ? false : true
      )
    )
  }
  return transactions
}

const getId = () => (new Date().getTime() + getNumberBetween(100, 10000)) / 13

const getTransactionFromToData = () => {
  const fromElement = getRandomArrayElement(Accounts)
  const fromId = fromElement.id
  const fromType = 'account'
  let toElement
  const typeTransaction = getNumberBetween(0, 1)

  if (typeTransaction === 0) {
    toElement = getRandomArrayElement(Accounts)
    toType = 'account'
    type = 'transfer'
  } else {
    toElement = getRandomArrayElement(Categories)
    toType = 'category'
    type = 'expense'
  }
  const toId = toElement.id
  const description = fromElement.name + ' --> ' + toElement.name + ' : ' + type

  // frommType: account
  // toType: account or category
  // type: income expense transfer

  return [fromId, toId, fromType, toType, type, description]
}

const getRecurringData = () => {
  const days = getNumberBetween(1, 100)

  return {
    date: getRandomDate(days, days % 2 === 0),
    period: {
      value: getNumberBetween(0, 30),
      type: getRandomArrayElement(PERIOD_TYPES)
    }
  }
}

Date.prototype.addDays = function (days) {
  var date = new Date(this.valueOf())
  date.setDate(date.getDate() + days)
  return date
}

Date.prototype.removeDays = function (days) {
  var date = new Date(this.valueOf())
  date.setDate(date.getDate() - days)
  return date
}

const getRandomDate = (days, isBeforeToday) => {
  const now = new Date()
  return isBeforeToday ? now.removeDays(days) : now.addDays(days)
}

const getRandomArrayElement = array => {
  return array[getNumberBetween(0, array.length - 1)]
}

const getNumberBetween = (start, end) => {
  if (start == 0 && end === 1) {
    return Math.floor(Math.random() * 100) % 2
  }
  return Math.floor(Math.random() * end) + start
}

export default seedTransactions()
