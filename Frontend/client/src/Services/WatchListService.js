import Axios from 'axios'

export class WatchListService {
    baseURL =  'http://localhost:4000/api/watchlist';

    getAllWatchList = () => {
        return Axios.get(this.baseURL);
    }

    addWatchList = (uid, cid) => {
        return Axios.post(this.baseURL, {'UserID': uid, 'CourseID': cid});
    }
}