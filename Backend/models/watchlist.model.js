const db = require('../utils/db')

module.exports = {
    all(uid) {
        return db('watchlist').where('isdeleted',false).andWhere('UserID', uid);
    },

    addWatchList(obj) {
        return db('watchlist').insert(obj);
    },

    deleteWatchList(uid,cid) {
        return db('watchlist').where('UserId',uid).andWhere('CourseId',cid).update({
                                                    'isdeleted':true,
                                                    'Log_UpdatedDate': new Date(),
                                                    });
    }
}