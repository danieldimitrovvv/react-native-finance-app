class User {
  constructor (
    id,
    email,
    password,
    name,
    gender,
    familyStatus,
    education,
    age,
    accounts,
    categories
  ) {
    this.id = id
    this.email = email
    this.password = password
    this.name = name
    this.gender = gender
    this.familyStatus = familyStatus
    this.education = education
    this.age = age
    this.accounts = accounts
    this.categories = categories
  }
}

export default User
