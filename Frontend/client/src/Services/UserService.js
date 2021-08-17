import Axios from 'axios'
import { URL } from './backendURL';

export class UserService {
    //baseURL = 'http://localhost:4000/api/user';
    baseURL = `${URL}/api/user`;

    login(username,password){
        let currentURL = this.baseURL + '/login'
        let data = {
            username : username,
            password : password
        }
        return Axios.post(currentURL,data)
    }

    register(info){
        let currentURL = this.baseURL + '/register'
        return Axios.post(currentURL,info)
    }

    getUserDetail(id){
        let currentURL =  this.baseURL + '/'+ id;
        return Axios.get(currentURL)
    }

    updateUserDetail(id,user){
        let currentURL =  this.baseURL + '/'+ id;
        return Axios.patch(currentURL,user)
    }

    changePassword(id, newPassword) {
        let currentURL =  this.baseURL + '/change-password/'+ id;
        return Axios.patch(currentURL, {'password': newPassword})
    }
}