import axios from 'axios'

class CourseService {
    baseURL = 'http://localhost:4000/api/course';

    addNewCourse = (course) => {
        return axios.post(this.baseURL, course);
    }

    getAllCourses = (query) => {
        if (query === null || query === undefined) 
            return axios.get(this.baseURL);
        else 
            return axios.get(this.baseURL,{params: query})
    }

    getCoursesByQuery = (query) => {
        return axios.get(this.baseURL,{params: query})
    }

    deleteCourse = (id) => {
        const currentURL = this.baseURL + "/delete/" + id;
        return axios.patch(currentURL);
    }

    getCourseDetail = (id) => {
        const currentURL = this.baseURL + "/" + id;
        return axios.get(currentURL);
    }

    getImage4CourseDetail = (id) => {
        const currentURL = this.baseURL + "/image/" + id;
        return axios.get(currentURL,{
            responseType: 'blob'
        });
    }

    updateCourse = (id, course) => {
        const currentURL = this.baseURL + "/" + id;
        return axios.patch(currentURL, course);
    }

    updateCourseImage(id, image) {
        const currentURL = this.baseURL + "/course_img/" + id;
        return axios.patch(currentURL,image,{
            headers: {
              'Content-Type': 'multipart/form-data'
            }
        })
    }
}

export default CourseService;