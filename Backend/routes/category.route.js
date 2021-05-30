const express = require('express')
const CategoryModel = require('../models/category.model');

const router = express.Router();

router.get('/',async function(req,res,next){
    const listCategory = await CategoryModel.all();
    res.json(listCategory);
})

router.get('/:id',async function(req,res,next){
    const id = req.params.id;
    const category = await CategoryModel.singleById(id);
    if (category === null){
        res.status(204).json({
            'err_message':'No content for category'
        })
    }
    res.status(200).json(category);
})

router.post('/',async function(req,res){
    const category = req.body;
    // console.log(category);
    if (category.name !== undefined){
        const validCategory = await CategoryModel.singleByName(category.name);
        console.log(validCategory);
        if (validCategory === null){
            category.Log_CreatedDate = new Date();
            const ids =await  CategoryModel.addCategory(category);
            category.id = ids[0];
            res.status(200).json(category);
        }
        else{
            res.json({
                'err_message':'This category is existed'
            });
        }
    }
    res.json({
        'err_message':'No content for category'
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
    await CategoryModel.deleteChildren(id);
    res.json({
        'message':'Delete successfully !!!'
    })
})

router.patch('/:id', async function(req,res,next){
    const id = req.params.id;
    const category = req.body; 
    category.Log_UpdatedDate = new Date();
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