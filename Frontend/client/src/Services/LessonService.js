import Axios from "axios";

export class LessonService {
    baseURL =  'http://localhost:4000/api/lesson';

    getLessons4Course = (course_id) => {
        const currentURL = this.baseURL + "/"+ course_id;
        return Axios.get(currentURL)
    }
}
