const express = require('express');
const purchasedCourseModel = require('../models/purchasedcourse.model');


const router = express.Router();

router.get('/:user_id',async function(req,res,next){
    let user_id = req.params.user_id;
    let listCourse4User = await purchasedCourseModel.getPurchasedCourseByUserId(user_id);
    return res.status(200).json(listCourse4User);
})

router.post('/',async function(req,res,next){
    let data = req.body;
    if (!data.user_id && !data.course_id){
        return res.status(204).json({
            'err_message': 'No user or no course'
        })
    }
    data.Log_CreatedDate = new Date();
    let newCourse4User = await purchasedCourseModel.addCourseByUserID(data);
    return res.status(200).json(data);
})

router.patch('/delete',async function(req,res,next){
    let data = req.body;
    if (!data.user_id || !data.course_id){
        return res.status(204).json({
            'err_message': 'No user or no course'
        })
    }
    let tmp = await purchasedCourseModel.deleteCourseByUserId(data.user_id,data.course_id);
    return res.status(200).json(data);

})

module.exports = router;