import MainRest from './MainRest'

class AuthRest extends MainRest {
  timer = null
  userId = null
  token = null
  userDetail = null

  constructor() {
    super()
    this.getInstance().defaults.baseURL = this.getInstance().defaults.baseURL + 'auth';
  }

  isAuth() {
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

  getUserDetail() {
    return this.userDetail
  }

  login = async (email, password) => {
    const data = {
      username: email,
      password: password
    }

    return this.getInstance().post('/login', data).then(response => {
      this.userDetail = {
        username: response.data.username,
        displayName: response.data.displayName,
        role: response.data.role,
      }
      this.token = response.data.token
      return response
    })
  }

  logout = () => {
    return this.getInstance().get('/logout').then(response => {
      clearLogoutTimer()
      this.setToken(null)
      this.setAuthUserId(null)
      AsyncStorage.removeItem('userData')
      return response
    })
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
