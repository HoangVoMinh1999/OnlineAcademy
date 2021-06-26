const express = require('express')
const courseModel = require('../models/course.model');

const router = express.Router();

router.get('/',async function(req,res,next){
    const listcourse = await courseModel.all();
    res.json(listcourse);
})
router.get('/:id',async function(req,res,next){
    const id = req.params.id;
    const course = await courseModel.singleById(id);
    res.status(201).json(course);
})

router.post('/',async function(req,res,next){
    const course = req.body;
    if (course.name !== undefined){
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
    }
    res.json({
        'err_message':'No content for course'
    });
})

router.patch('/delete/:id',async function(req,res,next){
    const id = req.params.id;
    const isDeleted = await courseModel.delete(id);
    if (isDeleted === null){
        return res.json({
            'err_message':'Course is not exist !!!'
        })
    }
    else if (isDeleted !== 1){
        return res.json({
            'err_message': 'Delete failed !!!'
        })
    }
    return res.json({
        'message':'Delete successfully !!!'
    })
})

router.patch('/:id', async function(req,res,next){
    const id = req.params.id;
    const course = req.body; 
    const isUpdated = await courseModel.update(id,course);
    if (isUpdated === null){
        res.json({
            'err_message':'Course is not exist !!!'
        })
    }
    else if (isUpdated !== 1){
        res.json({
            'err_message': 'Update failed !!!'
        })
    }
    res.json({
        'message':'Update successfully !!!'
    })
})

router.patch('/course_img/:id',async (req,res) => {
    const id = req.params.id;
    const img = req.body;
    const isUpdated = await courseModel.updateImage(id,img);
    if (isUpdated === null){
        res.json({
            'err_message':'Course is not exist !!!'
        })
    }
    else if (isUpdated !== 1){
        res.json({
            'err_message': 'Update failed !!!'
        })
    }
    res.json({
        'message':'Update successfully !!!'
    })
})
module.exports = router;