import Axios from 'axios'

export class CourseService {
    baseURL =  'http://localhost:4000/api/course';

    getAllCourse = () => {
        return Axios.get(this.baseURL);
    }
}