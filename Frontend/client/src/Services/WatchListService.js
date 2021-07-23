import Axios from 'axios'

export class WatchListService {
    baseURL =  'http://localhost:4000/api/watchlist';

    getAllWatchList = (uid) => {
        return Axios.get(this.baseURL, {'UserID': uid});
    }

    addWatchList = (uid, cid) => {
        return Axios.post(this.baseURL, {'UserID': uid, 'CourseID': cid});
    }
}