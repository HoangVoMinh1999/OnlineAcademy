const express = require('express');
const bcrypt = require('bcryptjs');
const userModel = require('../models/user.model');
const jwt = require('jsonwebtoken');
const randomstring = require('randomstring');
const nodemailer = require('../configs/nodemailler.config');

const router = express.Router();

router.get('/', async function (req, res, next) {
    const listteacher = await userModel.all();
    listteacher.forEach(function (item, index, array) {
        delete item.username;
        delete item.password;
        delete item.rfToken;
        delete item.avatar;
    })
    return res.json(listteacher);
})

router.get('/:id', async function (req, res, next) {
    const id = req.params.id;
    const user = await userModel.singleById(id);
    if (user !== null) {
        delete user.username;
        delete user.password;
        return res.status(200).json(user);
    }
    return res.json({
        'err_message': 'User is not exist !!!'
    })
})

router.patch('/delete/:id', async function (req, res, next) {
    const id = req.params.id;
    const isDeleted = await userModel.delete(id);
    if (isDeleted === null) {
        return res.json({
            message: 'User is not exist !!!'
        })
    } else if (isDeleted !== 1) {
        return res.json({
            message: 'Delete failed !!!'
        })
    }
    return res.json({
        message: 'Delete successfully !!!'
    })
})

router.patch('/:id', async function (req, res, next) {
    const id = req.params.id;
    const user = req.body;
    const isUpdated = await userModel.update(id, user);
    if (isUpdated === null) {
        return res.json({
            'err_message': 'User is not exist !!!'
        })
    } else if (isUpdated !== 1) {
        return res.json({
            'err_message': 'Update failed !!!'
        })
    }
    return res.status(200).json(user)
})

router.post('/register', async function (req, res, next) {
    const user = req.body;
    if (user.username === undefined || user.password === undefined) {
        return res.json({
            message: 'Invalid username or password!'
        })
    }
    const tmp = await userModel.singleByUserName(user.username);
    if (tmp !== null) {
        return res.json({
            message: 'Username is not available!'
        })
    }
    const tmp_email = await userModel.singleByEmail(user.email);
    if (tmp_email !== null){
        return res.json({
            message: 'Email is not available!'
        })
    }

    delete user.password_02;
    user.password = bcrypt.hashSync(user.password, 10);
    user.Log_CreatedDate = new Date();
    const ids = await userModel.register(user);
    user.id = ids[0];
    delete user.password;

    nodemailer.sendConfirmationEmail(
        user.username,
        user.email,
        user.id,
    )

    return res.status(200).json({
        account: user
    });

})

router.post('/login', async function (req, res, next) {
    const user = req.body;
    const tmp = await userModel.singleByUserName(user.username);
    if (tmp === null) {
        return res.json({
            authenticated: false,
            message: 'Username is not exist!'
        })
    }
    const isMatch = bcrypt.compareSync(user.password, tmp.password);
    if (isMatch === false) {
        return res.json({
            authenticated: false,
            message: 'Password is incorrect!'
        })
    }
    var value = [...tmp.IsConfirmed];
    if (value[0] === 0){
        return res.json({
            authenticated: false,
            message: 'User is not confirmed !!!'
        })
    }
    var value = [...tmp.IsDisabled];
    if (value[0] === 1){
        return res.json({
            authenticated:false,
            message: 'User is disabled !!!'
        })
    }
    //--- input for jwt.sign
    const payload = {
        userId: tmp.id,
        IsAdmin: tmp.IsAdmin,
        IsTeacher: tmp.IsTeacher,
    }
    const opts = {
        expiresIn: 10 * 60
    }
    //--- Token
    const accessToken = jwt.sign(payload, 'SECRET_KEY', opts);
    const rfToken = randomstring.generate(99);
    await userModel.updateRfToken(tmp.id, rfToken)
    return res.status(200).json({
        authenticated: true,
        accessToken: accessToken,
        rfToken: rfToken,
    });
})

router.post('/refresh', async (req, res) => {
    const {
        accessToken,
        rfToken
    } = req.body;
    const {
        userId
    } = jwt.verify(accessToken, 'SECRET_KEY', {
        ignoreExpiration: true,
    })
    const ret = await userModel.isValidRFToken(userId, rfToken);
    if (ret === true) {
        const opts = {
            expiresIn: 10 * 60
        }
        const newAccessToken = jwt.sign({
            userId
        }, 'SECRET_KEY', opts);
        return res.json({
            accessToken: newAccessToken
        })
    }
    return res.status(400).json({
        message: 'Refresh token is revoked'
    })
})

router.post('/confirm/:id',async function(req,res,next){
    let id = req.params.id;
    let user = await userModel.singleById(id);
    if (user === null){
        return res.status(204).json({
            'err_message': 'No user for confirm !!!'
        })
    }
    user.Log_UpdatedDate = new Date();
    user.Log_UpdatedBy = user.username;
    user.IsConfirmed = true;

    delete user.username;
    delete user.password;

    await userModel.confirmAccount(id,user);
    return res.redirect('http://localhost:3000/')
})

router.patch('/change-password/:id', async(req, res) => {
    let id = req.params.id;
    let user = await userModel.singleById(id);
    if (user === null){
        return res.status(204).json({
            'err_message': 'No user !!!'
        })
    }
    let newPassword = req.body.password;
    console.log(newPassword);
    let newHashPassword = bcrypt.hashSync(newPassword, 10);
    await userModel.changePassword(id, newHashPassword);
    return res.status(200).json({
        'message': 'Change password successfully !!!'
    })
})
module.exports = router;