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

    updateViewCourse = (id) => {
        const currentURL = this.baseURL + "/update_view/" + id;
        return Axios.patch(currentURL);
    }
    
    updateStudent = (id) => {
        const currentURL = this.baseURL + "/update_student/" + id;
        return Axios.patch(currentURL);
    }
}