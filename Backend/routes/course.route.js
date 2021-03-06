const express = require('express')
const courseModel = require('../models/course.model');

const router = express.Router();
const fs = require('fs');
const multer = require('multer');
// SET STORAGE
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + req.params.id + '.png')
    }
})

var upload = multer({
    storage: storage
})


router.get('/', async function (req, res, next) {
    const offset = 6;
    const query = req.query;
    const queryWithoutPage = {...query};
    delete queryWithoutPage.page
    if (queryWithoutPage.hasOwnProperty('search') && queryWithoutPage.search === ''){
        delete queryWithoutPage.search;
    }
    let listCourse = [];
    let lengthListCourse = 0;
    if (Object.keys(queryWithoutPage).length !== 0) {
        if (query.hasOwnProperty('search') && query.search !== '') {
            if (query.search !== ''){
                listCourse = await courseModel.fullTextSearch4Course(query.search);
                lengthListCourse = listCourse.length;
            }
            else{
                listCourse = await courseModel.all();
                lengthListCourse = listCourse.length;
            }
        }
        if(query.hasOwnProperty('category')){
            if (query.category === '' && listCourse.length === 0){
                listCourse = await courseModel.all();
                lengthListCourse = listCourse.length;
            }
            else if (listCourse.length === 0){
                listCourse = await courseModel.getCourseByCategory(query.category);
                lengthListCourse = listCourse.length;
            }
            else{
                listCourse = listCourse.filter(t => t.category_id.toString() === query.category);
                lengthListCourse = listCourse.length;
            }
        }
        if(query.hasOwnProperty('field') && query.hasOwnProperty('desc')){
            if (query.desc === true){
                listCourse = listCourse.sort((a,b) => b[query.field] - a[query.field])
            }
            else{
                listCourse = listCourse.sort((a,b) => a[query.field] - b[query.field])
            }
        }
    } else {
        listCourse = await courseModel.all();
        lengthListCourse = listCourse.length;
    }

    if (query.hasOwnProperty('page')){
        listCourse = listCourse.slice((query.page-1)*offset,query.page*offset)
    }
    listCourse.forEach(t =>{
        delete t.image;
        delete isDeleted;
    })
    return res.json({
        'listCourse' : listCourse,
        'length' : lengthListCourse,
    });
})
router.get('/:id', async function (req, res, next) {
    const id = req.params.id;
    const course = await courseModel.singleById(id);
    if (course !== null) {
        delete course.image;
        return res.status(201).json(course);
    }
    return res.status(204).json({
        'err_message': 'No course'
    });
})

router.get('/image/:id', async function (req, res, next) {
    const id = req.params.id;
    const course = await courseModel.singleById(id);
    if (course !== null) {
        return res.status(200).send(course.image);
    }
    return res.status(204).json({
        'err_message': 'No course'
    });
})

router.post('/', async function (req, res, next) {
    const course = req.body;
    if (course.name !== undefined) {
        const validcourse = await courseModel.singleByName(course.name);
        if (validcourse == null) {
            course.Log_CreatedDate = new Date();
            const ids = await courseModel.addcourse(course);
            course.id = ids[0];
            res.status(200).json(course);
        }
        res.status(500).json({
            'err_message': 'This course is existed'
        });
    }
    res.json({
        'err_message': 'No content for course'
    });
})

router.patch('/delete/:id', async function (req, res, next) {
    const id = req.params.id;
    const isDeleted = await courseModel.delete(id);
    if (isDeleted === null) {
        return res.json({
            'err_message': 'Course is not exist !!!'
        })
    } else if (isDeleted !== 1) {
        return res.json({
            'err_message': 'Delete failed !!!'
        })
    }
    return res.json({
        'message': 'Delete successfully !!!'
    })
})

router.patch('/:id', async function (req, res, next) {
    const id = req.params.id;
    const course = req.body;
    delete course.selectedImage;
    delete course.selectedImageData;
    const isUpdated = await courseModel.update(id, course);
    if (isUpdated === null) {
        res.json({
            'err_message': 'Course is not exist !!!'
        })
    } else if (isUpdated !== 1) {
        res.json({
            'err_message': 'Update failed !!!'
        })
    }
    res.json({
        'message': 'Update successfully !!!'
    })
})

router.patch('/course_img/:id', upload.single('image'), async (req, res) => {

    const id = req.params.id
    const img = req.file;
    const img_src = req.file.fieldname + '-' + id + '.png';
    let newImage = null;
    if (req.file) {
        newImage = fs.readFileSync('./uploads/' + req.file.filename)
    } else {
        newImage = ""
    }
    const isUpdated = await courseModel.updateImage(id,newImage,img_src);
    if (isUpdated === null) {
        return res.json({
            'err_message': 'Course is not exist !!!'
        })
    } else if (isUpdated !== 1) {
        return res.json({
            'err_message': 'Update failed !!!'
        })
    }
    return res.json({
        'message': 'Update successfully !!!'
    })
})

router.patch('/update_view/:id', async function(req, res) {
    const id = req.params.id;
    await courseModel.updateView(id);
    return res.json({
        'message': 'Update successfully !!!'
    })
})

router.patch('/update_student/:id', async function(req, res) {
    const id = req.params.id;
    await courseModel.updateStudent(id);
    return res.json({
        'message': 'Update successfully !!!'
    })
})

module.exports = router;