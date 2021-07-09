import Axios from 'axios'

export class UserService {
    baseURL = 'http://localhost:4000/api/user';

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
}