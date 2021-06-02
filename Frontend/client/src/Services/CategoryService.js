import Axios from 'axios'

export class CategoryService {
    baseURL =  'http://localhost:4000/api/category';

    getAllCategory = () => {
        return Axios.get(this.baseURL);
    }
}