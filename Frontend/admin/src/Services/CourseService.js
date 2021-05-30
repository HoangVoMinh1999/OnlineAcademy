import axios from 'axios'

class CourseService{
    baseURL = 'http://localhost:4000/api/course';

    addNewCourse = (course) => {
        return axios.post(this.baseURL,course);
    }

    getAllCourses = () => {
        return axios.get(this.baseURL);
    }

    deleteCourse = (id) => {
        const currentURL = this.baseURL + "/delete/"+id;
        return axios.patch(currentURL);
    }

    getCourseDetail = (id) => {
        const currentURL = this.baseURL + "/"+id;
        return axios.get(currentURL);
    }

    updateCourse = (id,course) => {
        const currentURL = this.baseURL + "/"+id;
        return axios.patch(currentURL,course);
    }
}

export default CourseService;