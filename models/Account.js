const ACTIVATED = 'activated'
const DEACTIVATED = 'deactivated'
const DELETED = 'deleted'

const ACCOUNT_TYPES = {
  ACTIVATED, DEACTIVATED, DELETED
}

class Account {
  constructor (id, userId, name, type, availability, sharedList) {
    this.id = id
    this.userId = userId
    this.name = name
    this.type = type
    this.availability = availability
    this.sharedList = sharedList
  }
}

export { ACCOUNT_TYPES }
export default Account
