import Axios from 'axios'

export class CommentService {
    baseURL =  'http://localhost:4000/api/comment';

    getComments4Course(course_id){
        let current_URL = this.baseURL + '/' + course_id;
        return Axios.get(current_URL);
    }

    addComment4Course(data){
        return Axios.post(this.baseURL,data);
    }

    updateComment4Course(){
        return Axios.patch(this.baseURL);
    }
}