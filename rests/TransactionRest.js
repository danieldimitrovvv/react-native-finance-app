import AuthRest from './AuthRest'
import Transactions from '../constants/storage/transactions'
import MainRest from './MainRest'
import Transaction from '../models/Transaction'

class TransactionRest extends MainRest {
  transactions = Transactions

  constructor () {
    super()
  }

  getTransactionsByAccountId = (accountId, page, numberOfTransactions) => {
    let allAccountTransactions = this.transactions.filter(
      t => t.fromId == accountId || t.toId == accountId
    )

    const transactions = allAccountTransactions.splice(
      page + numberOfTransactions,
      numberOfTransactions
    )
    const numberOfPages =
      numberOfTransactions === 0
        ? 0
        : Math.floor(allAccountTransactions.length / numberOfTransactions)

    const response = {
      page: {
        transactions,
        numberOfPages
      }
    }

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (transactions) resolve(response)
        else reject('Please login?')
      }, 300)
    })
  }

  getTransactionsFromAccountById = accountId => {
    let transactions = this.transactions.filter(
      t => t.fromId == accountId && t.fromType === 'account'
    )
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (transactions) resolve(transactions)
        else reject('Please login?')
      }, 300)
    })
  }

  getTransactionsToAccountById = accountId => {
    let transactions = this.transactions.filter(
      t => t.toId == accountId && t.toType === 'account'
    )
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (transactions) resolve(transactions)
        else reject('Please login?')
      }, 300)
    })
  }

  getTransactionsByCategoryId = (categoryId, page, numberOfTransactions) => {
    let allCategoryTransactions = this.transactions.filter(
      t => t.fromId == categoryId || t.toId == categoryId
    )
    const transactions = allCategoryTransactions.splice(
      page + numberOfTransactions,
      numberOfTransactions
    )
    const numberOfPages =
      numberOfTransactions === 0
        ? 0
        : Math.floor(allCategoryTransactions.length / numberOfTransactions)

    const response = {
      page: {
        transactions,
        numberOfPages
      }
    }
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (transactions) resolve(response)
        else reject('Please login?')
      }, 300)
    })
  }

  getTransactionsToCategoryById = categoryId => {
    let transactions = this.transactions.filter(
      t => t.toId == categoryId && t.toType === 'category'
    )
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (transactions) resolve(transactions)
        else reject('Please login?')
      }, 300)
    })
  }

  add () {
    const id = (new Date().getTime() * new Date().getTime()) / 13
    const userID = AuthRest.getAuthUserId()
    this.transactions.push(
      new Transaction(
        id,
        userID,
        new Date(),
        data.fromId,
        data.toId,
        data.fromType,
        data.toType,
        data.type,
        data.sum,
        data.recurring,
        data.description,
        data.shouldBeAutomaticallyExecuted
      )
    )

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (id) resolve(id)
        else reject('Please login?')
      }, 300)
    })
  }
}

export default new TransactionRest()
