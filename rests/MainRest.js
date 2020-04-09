import * as axios from 'react-native-axios';
class MainRest {
  _instance
  constructor() {
    this._instance = axios.create({
      baseURL: 'http://10.0.2.2:8800/',
      // timeout: 1000,
      headers: {'Content-Type': 'application/json'}
    });
    console.log(this._instance.defaults.headers)
  }

  getInstance = () =>{
    return this._instance
  }

  setHeaders = (headers) =>{
    this._instance.setHeaders({...this._instance.defaults.headers, ...headers})
  }
}

export default MainRest;
