import Axios from "axios";
import { URL } from './backendURL';

export class PurchasedCourseService {
    //baseURL =  'http://localhost:4000/api/purchasedcourse';
    baseURL = `${URL}/api/purchasedcourse`

    getPurchasedCourse4User(user_id){
        const currentURL = this.baseURL + "/"+ user_id;
        return Axios.get(currentURL);
    }

    buyCourse4User(data){
        return Axios.post(this.baseURL,data);
    }

    deleteCourse4User(data){
        const currentURL = this.baseURL+"/delete";
        return Axios.patch(currentURL,data);
    }
}
