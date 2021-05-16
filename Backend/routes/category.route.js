const express = require('express')
const CategoryModel = require('../models/category.model');

const router = express.Router();

router.get('/',async function(req,res,next){
    const listCategory = await CategoryModel.all();
    res.json(listCategory);
})

router.post('/',async function(req,res,next){
    const category = req.body;
    console.log(category)
    const validCategory = await CategoryModel.singleByName(category.name);
    if (validCategory == null){
        category.Log_CreatedDate = new Date();
        const ids =await  CategoryModel.addCategory(category);
        category.id = ids[0];
        res.status(200).json(category);
    }
    res.status(500).json({
        'err_message':'This category is existed'
    });
})

router.patch('/delete/:id',async function(req,res,next){
    const id = req.params.id;
    const isDeleted = await CategoryModel.delete(id);
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
    const category = req.body; 
    const isUpdated = await CategoryModel.update(id,category);
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