const express = require('express')
const teacherModel = require('../models/teacher.model');

const router = express.Router();

router.get('/',async function(req,res,next){
    const listteacher = await teacherModel.all();
    res.json(listteacher);
})

router.post('/',async function(req,res,next){
    const teacher = req.body;
    if (teacher.name !== undefined){
        const validteacher = await teacherModel.singleByName(teacher.name);
        if (validteacher == null){
            teacher.Log_CreatedDate = new Date();
            const ids =await  teacherModel.addteacher(teacher);
            teacher.id = ids[0];
            res.status(200).json(teacher);
        }
        res.status(500).json({
            'err_message':'This teacher is existed'
        });
    }
    res.json({
        'err_message':'No content for teacher'
    });
})

router.patch('/delete/:id',async function(req,res,next){
    const id = req.params.id;
    const isDeleted = await teacherModel.delete(id);
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
    const teacher = req.body; 
    const isUpdated = await teacherModel.update(id,teacher);
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