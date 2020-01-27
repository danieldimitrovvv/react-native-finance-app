import UserRest from './UserRest'
import MainRest from './MainRest'

class AuthRest extends MainRest {
  timer = null
  userId = null
  token = null

  constructor () {
    super()
  }

  isAuth () {
    return this.token != null
  }

  getToken = () => {
    return this.token
  }

  setToken = token => {
    this.token = token
  }

  getAuthUserId = () => {
    return this.userId
  }

  setAuthUserId = userId => {
    this.userId = userId
  }

  getUserDetail () {
    return UserRest.getById(this.userId)
  }

  login = async (email, password) => {
    let userDetail = await UserRest.getByEmailAndPassword(email, password)
    if (userDetail) {
      this.setToken(userDetail.email)
      this.setAuthUserId(userDetail.id)
    }
  }

  logout = () => {
    clearLogoutTimer()
    this.setToken(null)
    this.setAuthUserId(null)
    AsyncStorage.removeItem('userData')
  }

  clearLogoutTimer = () => {
    if (timer) {
      clearTimeout(timer)
    }
  }

  setLogoutTimer = expirationTime => {
    timer = setTimeout(() => {
      logout()
    }, expirationTime)
  }
}

export default new AuthRest()
