import axios from "axios";
import { URL } from "./backendURL";

class UserService {
    //baseURL =  'http://localhost:4000/api/user';
    baseURL = `${URL}/api/user`;

    getAllUser(){
        return axios.get(this.baseURL);
    }

    updateUser(id,data) {
        const currentURL =`${this.baseURL}/${id}`
        return axios.patch(currentURL,data); 
    }
}

export default UserService;