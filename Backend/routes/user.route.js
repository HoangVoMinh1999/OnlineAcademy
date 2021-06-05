const express = require('express');
const bcrypt = require('bcryptjs');
const { singleByUserName } = require('../models/user.model');
const userModel = require('../models/user.model');

const router = express.Router();

router.get('/', async function (req, res, next) {
    const listteacher = await userModel.all();
    res.json(listteacher);
})

// router.post('/', async function (req, res, next) {
//     const user = req.body;
//     if (teacher.name !== undefined) {
//         user.Log_CreatedDate = new Date();
//         const ids = await userModel.addteacher(teacher);
//         user.id = ids[0];
//         res.status(200).json(teacher);
//     }
//     res.json({
//         'err_message': 'No content for user'
//     });
// })

router.patch('/delete/:id', async function (req, res, next) {
    const id = req.params.id;
    const isDeleted = await userModel.delete(id);
    if (isDeleted === null) {
        res.json({
            'message': 'User is not exist !!!'
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
    const isUpdated = await userModel.update(id, teacher);
    if (isUpdated === null) {
        res.json({
            'message': 'User is not exist !!!'
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

router.post('/register', async function (req, res, next) {
    const user = req.body;
    if (user.username === undefined || user.password === undefined) {
        return res.status(400).json({
            'message': 'Invalid username or password!'
        })
    }
    const tmp = await userModel.singleByUserName(user.username);
    if (tmp !== null) {
        return res.status(400).json({
            'message': 'Username is available!'
        })
    }
    user.password = bcrypt.hashSync(user.password, 10);
    user.Log_CreatedDate = new Date();
    const ids = await userModel.addteacher(user);
    user.id = ids[0];
    return res.status(200).json({
        'message': 'Register successfully!'
    });

})

router.post('/login', async function (req, res, next) {
    const user = req.body;
    const tmp = await userModel.singleByUserName(user.username);
    if (tmp === null) {
        return res.status(404).json({
            'message': 'Username is not exist!'
        })
    }
    const isMatch = bcrypt.compareSync(user.password, tmp.password);
    if (isMatch === false)
    {
        return res.status(400).json({
            'message': 'Password is incorrect!'
        })
    }
    return res.status(200).json({
        'message': 'Login successfully!'
    });
})
module.exports = router;