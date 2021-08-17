import Axios from 'axios';
import { URL } from './backendURL';

export class WatchListService {
    //baseURL =  'http://localhost:4000/api/watchlist';
    baseURL = `${URL}/api/watchlist`;

    getAllWatchList = (uid) => {
        const currentURL = this.baseURL + '/'+uid;
        return Axios.get(currentURL);
    }

    addWatchList = (uid, cid) => {
        return Axios.post(this.baseURL, {'UserID': uid, 'CourseID': cid});
    }

    delete = (uid,cid) => {
        const currentURL = `${this.baseURL}/delete`
        return Axios.patch(currentURL,{'UserID': uid, 'CourseID': cid})
    }
}