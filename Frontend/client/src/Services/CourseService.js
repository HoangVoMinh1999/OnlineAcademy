import Axios from 'axios'

export class CourseService {
    baseURL =  'http://localhost:4000/api/course';

    getAllCourses = (query) => {
        if (query === null || query === undefined) 
            return Axios.get(this.baseURL);
        else 
            return Axios.get(this.baseURL,{params: query})
    }

    getImage4CourseDetail = (id) => {
        const currentURL = this.baseURL + "/image/" + id;
        return Axios.get(currentURL,{
            responseType: 'blob'
        });
    }

}