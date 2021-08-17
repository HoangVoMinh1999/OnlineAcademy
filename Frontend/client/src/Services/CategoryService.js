import Axios from 'axios'
import { URL } from './backendURL';

export class CategoryService {
    //baseURL =  'http://localhost:4000/api/category';
    baseURL = `${URL}/api/category`

    getAllCategory = () => {
        return Axios.get(this.baseURL);
    }
}