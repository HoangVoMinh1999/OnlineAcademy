const express = require('express');
const watchlistModel = require('../models/watchlist.model');

const router = express.Router()

router.get('/:UserID', async function(req, res) {
    const uid = req.params.UserID;
    const watchlist = await watchlistModel.all(uid);
    const lengthWatchList = watchlist.length;
    if (lengthWatchList === null) {
        return res.status(204).json({
            'message': 'Danh sách yêu thích rỗng'
        })
    }
    return res.status(200).json({
        watchlist: watchlist,
    })
})

router.post('/', async function(req, res) {
    const watchlist = req.body;
    const ids = await watchlistModel.addWatchList(watchlist);
    return res.status(200).json({
        'message': 'Thêm vào danh sách yêu thích thành công'
    })
})

router.patch('/delete',async function(req,res){
    console.log(req.body)
    const {UserID,CourseID} = req.body;
    await watchlistModel.deleteWatchList(UserID,CourseID)
    return res.status(200).json({
        'message': 'Xóa thành công'
    })
})
module.exports = router;