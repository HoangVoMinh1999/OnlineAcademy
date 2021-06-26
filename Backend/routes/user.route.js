const express = require('express');
const bcrypt = require('bcryptjs');
const userModel = require('../models/user.model');
const jwt = require('jsonwebtoken');
const randomstring = require('randomstring');

const router = express.Router();

router.get('/', async function (req, res, next) {
    const listteacher = await userModel.all();
    return res.json(listteacher);
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
    constuser = req.body;
    const isUpdated = await userModel.update(id, teacher);
    if (isUpdated === null) {
        return res.json({
            message: 'User is not exist !!!'
        })
    } else if (isUpdated !== 1) {
        return res.json({
            message: 'Update failed !!!'
        })
    }
    return res.json({
        message: 'Update successfully !!!'
    })
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
    delete user.password_02;
    user.password = bcrypt.hashSync(user.password, 10);
    user.Log_CreatedDate = new Date();
    const ids = await userModel.register(user);
    user.id = ids[0];
    delete user.password;
    return res.status(200).json({
        account : user
    });

})

router.post('/login', async function (req, res, next) {
    const user = req.body;
    const tmp = await userModel.singleByUserName(user.username);
    if (tmp === null) {
        return res.json({
            authenticated : false,
            message: 'Username is not exist!'
        })
    }
    const isMatch = bcrypt.compareSync(user.password, tmp.password);
    if (isMatch === false)
    {
        return res.json({
            authenticated: false,
            message: 'Password is incorrect!'
        })
    }
    //--- input for jwt.sign
    const payload = {
        userId : tmp.id,
        IsAdmin: tmp.IsAdmin,
    }
    const opts = {expiresIn : 10*60}
    //--- Token
    const accessToken = jwt.sign(payload,'SECRET_KEY',opts);
    const rfToken = randomstring.generate(99);
    await userModel.updateRfToken(tmp.id,rfToken)
    return res.status(200).json({
        authenticated: true,
        accessToken : accessToken,
        rfToken: rfToken,
    });
})

router.post('/refresh',async (req,res) => {
    const {accessToken , rfToken} = req.body;
    const {userId} = jwt.verify(accessToken,'SECRET_KEY',{
        ignoreExpiration : true,
    })
    const ret = await userModel.isValidRFToken(userId,rfToken);
    if (ret === true){
        const opts = {expiresIn : 10*60}
        const newAccessToken = jwt.sign({userId},'SECRET_KEY',opts);
        return res.json({
            accessToken : newAccessToken
        })
    }
    return res.status(400).json({
        message : 'Refresh token is revoked'
    })
})
module.exports = router;