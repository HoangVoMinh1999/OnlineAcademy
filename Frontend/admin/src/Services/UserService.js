import axios from "axios";

class UserService {
    baseURL =  'http://localhost:4000/api/user';

    getAllUser(){
        return axios.get(this.baseURL);
    }
}

export default UserService;