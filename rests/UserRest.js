import MainRest from './MainRest'
import AuthRest from './AuthRest';

class UserRest extends MainRest {

  constructor () {
    super()
    this.getInstance().defaults.baseURL += 'users';
  }

  getById = id => {
    this.setHeaders({'Authorization': 'Bearer ' + AuthRest.getToken()})
    return this.getInstance().get('/'+ id)
  }

  register = (email, name, password, gender, familyStatus, education, age) => {
   const data = {
      email,
      name,
      password,
      gender,
      familyStatus,
      education,
      age
    };
    this.getInstance().defaults.headers.post['Content-Type'] = 'application/json';
    // return this.getInstance().post('users', data)
    return this.getInstance().post('', data)
  }

}

export default new UserRest()
