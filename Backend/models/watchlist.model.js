const db = require('../utils/db')

module.exports = {
    all(uid) {
        return db('watchlist').where('isdeleted',false).andWhere('UserID', uid);
    },

    addWatchList(obj) {
        return db('watchlist').insert(obj);
    },

    async deleteWatchList() {
        
    }
}