import Axios from 'axios'

class LessonService {
    baseURL =  'http://localhost:4000/api/lesson';

    getLessons4Course = (course_id) => {
        const currentURL = this.baseURL + "/"+ course_id;
        return Axios.get(currentURL)
    }

    addLesson4Course = (course) => {
        return Axios.post(this.baseURL,course)
    }
}

export default LessonService