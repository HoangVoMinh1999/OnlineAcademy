import axios from 'axios';

class CategoryService {
    baseURL = 'http://localhost:4000/api/category';


    addNewCategory = (cat) => {
        return axios.post(this.baseURL, cat);
    }

    getAllCategories = () => {
        return axios.get(this.baseURL);
    }

    deleteCategory = (id) => {
        const currentURL = this.baseURL + "/delete/" + id;
        return axios.patch(currentURL);
    }

    getCategoryDetail = (id) => {
        const currentURL = this.baseURL+"/"+id;
        return axios.get(currentURL);
    }

    updateCategogyDetail = (id,cat) => {
        const currentURL = this.baseURL+"/"+id;
        return axios.patch(currentURL,cat);
    }
}


export default CategoryService;