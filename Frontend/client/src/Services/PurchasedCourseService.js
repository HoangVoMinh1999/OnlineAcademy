import Axios from "axios";

export class PurchasedCourseService {
    baseURL =  'http://localhost:4000/api/purchasedcourse';

    getPurchasedCourse4User(user_id){
        const currentURL = this.baseURL + "/"+ user_id;
        return Axios.get(currentURL);
    }
}
