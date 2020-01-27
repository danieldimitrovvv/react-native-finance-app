import AuthRest from './AuthRest'
import Accounts from '../constants/storage/accounts'
import MainRest from './MainRest'
import Account from '../models/Account'

class AccountRest extends MainRest {
  //income and expense
  //activated, deactivated, deleted

  accounts = Accounts

  constructor () {
    super()
  }

  getAccounts = () => {
    const userID = AuthRest.getAuthUserId()
    let userAccounts = this.accounts.filter(account => account.userId == userID)
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (userAccounts) resolve(userAccounts)
        else reject('Please login?')
      }, 300)
    })
  }

  add(name, availability) {
    const id = (new Date().getTime() * new Date().getTime()) / 13
    const userID = AuthRest.getAuthUserId()
    this.accounts.push(
      new Account(id, userID, name, 'activated', availability, [])
    )

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (id) resolve(id)
        else reject('Please login?')
      }, 300)
    })
  }
}

export default new AccountRest()
