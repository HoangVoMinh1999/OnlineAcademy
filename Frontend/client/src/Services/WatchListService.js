import Axios from 'axios'

export class WatchListService {
    baseURL =  'http://localhost:4000/api/watchlist';

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