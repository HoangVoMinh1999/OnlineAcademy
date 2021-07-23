import { GET_WATCHLIST } from "../Action/type"

const stateWatchList = {
    WatchList: [],
}

export const WatchListReducer = (state = stateWatchList, action) => {
    switch(action.type) {
        case GET_WATCHLIST: {
            let watchlist = state.WatchList;
            watchlist = action.payload;
            state.WatchList = watchlist;
            return {...state};
        }
    }
    return {...state};
}