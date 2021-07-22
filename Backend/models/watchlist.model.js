const db = require('../utils/db')

module.exports = {
    all() {
        return db('watchlist').where('isdeleted',0);
    },

    addWatchList(obj) {
        return db('watchlist').insert(obj);
    },

    async deleteWatchList() {
        
    }
}