const express = require('express');
const commentModel = require('../models/comment.model')
const userModel = require('../models/user.model')

const router = express.Router();

router.get('/:course_id',async function(req,res){
    let course_id = req.params.course_id;
    let commentList = await commentModel.allComment4Course(course_id);
    let result = await Promise.all(commentList.map(async (lesson) => {
        let user = await userModel.singleById(lesson.user_id);
        lesson.username = user.username;
        return lesson;
    })) 
    return res.status(200).json(result);
});

router.post('/',async function(req,res){
    let data = req.body;
    data.Log_CreatedDate = new Date();
    data.Log_UpdatedDate = data.Log_CreatedDate;
    let result = await commentModel.addComment4Course(data);
    if (result === null){
        data.Log_UpdatedDate = new Date();
        data.Log_UpdatedBy = data.Log_CreatedBy;
        delete data.Log_CreatedBy;
        result = await commentModel.updateComment(data);
        return res.status(200).json(data);
    }
    return res.status(200).json(data);
})

router.patch('/',async function(req,res){
    let data = req.body;
    data.Log_UpdatedDate = new Date();
    let result = await commentModel.updateComment(data);
    if (result === null){
        return res.status(204).json({
            'err_message': 'Comment is not available'
        });
    }
    return res.status(200).json(data);
})
module.exports = router;