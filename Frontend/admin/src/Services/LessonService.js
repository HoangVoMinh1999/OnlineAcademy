import Axios from 'axios'

class LessonService {
    baseURL =  'http://localhost:4000/api/lesson';

    getLessons4Course = (course_id) => {
        const currentURL = this.baseURL + "/"+ course_id;
        return Axios.get(currentURL)
    }

    addLesson4Course = (lesson) => {
        return Axios.post(this.baseURL,lesson)
    }

    getLessonById = (id) => {
        const currentURL = this.baseURL + "/single/"+id;
        return Axios.get(currentURL);
    }

    updateLesson4Course = (id,obj) => {
        const currentURL = this.baseURL + "/"+id;
        return Axios.patch(currentURL,obj)
    }

    delete = (id) => {
        const currentURL = this.baseURL + "/delete/"+ id;
        return Axios.patch(currentURL);
    }

    updateVideo4Lesson = (id,video) => {
        const currentURL = this.baseURL + "/uploadVideo/" + id;
        return Axios.patch(currentURL,video,{
            headers: {
              'Content-Type': 'multipart/form-data'
            }
        })
    }

    getVideo4Lesson = (id) => {
        const currentURL = this.baseURL + "/single/video/" + id;
        return Axios.get(currentURL,{
            responseType: 'blob'
        })
    }
}

export default LessonService