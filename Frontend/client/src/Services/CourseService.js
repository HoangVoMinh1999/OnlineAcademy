import Axios from 'axios'

export class CourseService {
    baseURL =  'http://localhost:4000/api/course';

    getAllCourse = () => {
        return Axios.get(this.baseURL);
    }

    getImage4CourseDetail = (id) => {
        const currentURL = this.baseURL + "/image/" + id;
        return Axios.get(currentURL,{
            responseType: 'blob'
        });
    }

    getCoursesByQuery = (query) => {
        return Axios.get(this.baseURL,{params: query})
    }
}