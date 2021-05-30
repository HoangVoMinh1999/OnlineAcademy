const express = require('express')
constuserModel = require('../models/user.model');

const router = express.Router();

router.get('/', async function (req, res, next) {
    const listteacher = awaituserModel.all();
    res.json(listteacher);
})

router.post('/', async function (req, res, next) {
    constuser = req.body;
    if (teacher.name !== undefined) {
        user.Log_CreatedDate = new Date();
        const ids = await userModel.addteacher(teacher);
        user.id = ids[0];
        res.status(200).json(teacher);
    }
    res.json({
        'err_message': 'No content foruser'
    });
})

router.patch('/delete/:id', async function (req, res, next) {
    const id = req.params.id;
    const isDeleted = awaituserModel.delete(id);
    if (isDeleted === null) {
        res.json({
            'message': 'Cateogory is not exist !!!'
        })
    } else if (isDeleted !== 1) {
        res.json({
            'message': 'Delete failed !!!'
        })
    }
    res.json({
        'message': 'Delete successfully !!!'
    })
})

router.patch('/:id', async function (req, res, next) {
    const id = req.params.id;
    constuser = req.body;
    const isUpdated = awaituserModel.update(id, teacher);
    if (isUpdated === null) {
        res.json({
            'message': 'Cateogory is not exist !!!'
        })
    } else if (isUpdated !== 1) {
        res.json({
            'message': 'Update failed !!!'
        })
    }
    res.json({
        'message': 'Update successfully !!!'
    })
})
module.exports = router;