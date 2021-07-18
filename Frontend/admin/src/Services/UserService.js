import axios from "axios";

class UserService {
    baseURL =  'http://localhost:4000/api/user';

    getAllUser(){
        return axios.get(this.baseURL);
    }

    updateUser(id,data) {
        const currentURL =`${this.baseURL}/${id}`
        return axios.patch(currentURL,data); 
    }
}

export default UserService;