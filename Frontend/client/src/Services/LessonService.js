import Axios from "axios";
import { URL } from './backendURL';

export class LessonService {
    //baseURL =  'http://localhost:4000/api/lesson';
    baseURL = `${URL}/api/lesson`

    getLessons4Course = (course_id) => {
        const currentURL = this.baseURL + "/"+ course_id;
        return Axios.get(currentURL)
    }

    getVideo4Lesson = (id) => {
        const currentURL = this.baseURL + "/single/video/" + id;
        return Axios.get(currentURL,{
            responseType: 'blob'
        })
    }
}
