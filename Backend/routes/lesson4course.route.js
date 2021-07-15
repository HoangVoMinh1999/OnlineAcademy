const express = require('express')
const lesson4courseModel = require('../models/lesson4course.model')
const fs = require('fs');
const router = express.Router();

const multer = require('multer');
// SET STORAGE
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + req.params.id + '.mp4')
    }
})

var upload = multer({
    storage: storage
})

router.get('/:course_id',async (req,res) => {
    let course_id = req.params.course_id;
    let lessons = await lesson4courseModel.getLessonByCourseId(course_id);

    return res.status(201).json(lessons)
})

router.post('/',async (req,res) => {
    let lesson = req.body;
    lesson.Log_CreatedDate = new Date();
    await lesson4courseModel.addNewLesson(lesson);
    return res.json(lesson)
})

router.get('/single/:id',async (req,res) => {
    let id = req.params.id;
    let lesson = await lesson4courseModel.singleById(id);
    if (lesson !== null){
        return res.status(200).json(lesson)
    }
    return res.status(204).json({
        'err_message': 'Không có bài giảng'
    })
})

router.get('/single/video/:id',async function(req,res){
    let id = req.params.id;
    let lesson = await lesson4courseModel.singleById(id);
    if (lesson === null){
        return res.status(204).json({
            'err_message' : 'No video for lesson',
        })
    }
    return res.status(200).send(lesson.video);
})

router.patch('/:id',async (req,res) => {
    let id = req.params.id;
    let lesson = req.body;
    let data = await lesson4courseModel.updateLesson(id,lesson);
    if (data === null){
        return res.status(204).json({
            'err_message': 'Không có bài học để cập nhật'
        })
    }
    return res.json(data);
})

router.patch('/delete/:id',async (req,res) => {
    let id = req.params.id;
    let data = await lesson4courseModel.delete(id);
    if (data === null){
        return res.status(204).json({
            'err_message': 'Không có bài học để xóa'
            
        })
    }
    return res.json(data)
})

router.patch('/uploadVideo/:id',upload.single('video'),async (req,res) => {
    const id = req.params.id;
    const video = req.file;
    console.log(video)
    let newVideo = null;
    if (video !== null && video !== undefined){
        newVideo = fs.readFileSync('./uploads/' + req.file.filename)
        let data = await lesson4courseModel.updateVideo(id,newVideo);
        if (data === null) {
            return res.json({
                'err_message': 'Course is not exist !!!'
            })
        } else if (data !== 1) {
            return res.json({
                'err_message': 'Update failed !!!'
            })
        }
        return res.json({
            'message': 'Update successfully !!!'
        })
    }
    return res.json({
        'err_message': 'Update failed !!!'
    })
})
module.exports = router