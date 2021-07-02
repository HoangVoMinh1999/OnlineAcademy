const express = require('express')
const lesson4courseModel = require('../models/lesson4course.model')

const router = express.Router();

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
        res.status(204).json({
            'err_message': 'Không có bài học để xóa'
            
        })
    }
    res.json(data)
})
module.exports = router