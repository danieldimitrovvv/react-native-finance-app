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

export default Transaction

