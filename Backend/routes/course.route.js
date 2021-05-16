const express = require('express')
const courseModel = require('../models/course.model');

const router = express.Router();

router.get('/',async function(req,res,next){
    const listcourse = await courseModel.all();
    res.json(listcourse);
})

router.post('/',async function(req,res,next){
    const course = req.body;
    const validcourse = await courseModel.singleByName(course.name);
    if (validcourse == null){
        course.Log_CreatedDate = new Date();
        const ids =await  courseModel.addcourse(course);
        course.id = ids[0];
        res.status(200).json(course);
    }
    res.status(500).json({
        'err_message':'This course is existed'
    });
})

router.patch('/delete/:id',async function(req,res,next){
    const id = req.params.id;
    const isDeleted = await courseModel.delete(id);
    if (isDeleted === null){
        res.json({
            'message':'Cateogory is not exist !!!'
        })
    }
    else if (isDeleted !== 1){
        res.json({
            'message': 'Delete failed !!!'
        })
    }
    res.json({
        'message':'Delete successfully !!!'
    })
})

router.patch('/:id', async function(req,res,next){
    const id = req.params.id;
    const course = req.body; 
    const isUpdated = await courseModel.update(id,course);
    if (isUpdated === null){
        res.json({
            'message':'Cateogory is not exist !!!'
        })
    }
    else if (isUpdated !== 1){
        res.json({
            'message': 'Update failed !!!'
        })
    }
    res.json({
        'message':'Update successfully !!!'
    })
})
module.exports = router;