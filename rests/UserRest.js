import Users from '../constants/storage/users'
import MainRest from './MainRest'

class UserRest extends MainRest {
  //income and expense
  //activated, deactivated, deleted

  users = Users

  constructor () {
    super()
  }

  getByEmailAndPassword = (email, password) => {
    let searchUser = this.users.find(
      u => u.email == email && u.password == password
    )
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (searchUser) resolve(searchUser)
        else reject('Incorrect credentials?')
      }, 300)
    })
  }

  getById = id => {
    let searchUser = this.users.find(u => u.id == id)
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (searchUser) resolve(searchUser)
        else reject('Incorrect user ID!!!')
      }, 300)
    })
  }

  register = (email, password, gender, familyStatus, education, age) => {
    const id = (new Date().getTime() * new Date().getTime()) / 13
    this.users.push({
      id,
      email,
      password,
      gender,
      familyStatus,
      education,
      age
    })

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(id)
      }, 300)
    })
  }

}

export default new UserRest()
