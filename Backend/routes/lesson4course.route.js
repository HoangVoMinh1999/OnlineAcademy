const express = require('express')
const lesson4courseModel = require('../models/lesson4course.model')

const router = express.Router();

router.get('/:course_id',async (req,res) => {
    let course_id = req.params.course_id;
    let lessons = await lesson4courseModel.getLessonByCourseId(course_id);

    res.status(201).json(lessons)
})

router.post('/',async (req,res) => {
    let lesson = req.body;
    lesson.Log_CreatedDate = new Date();
    await lesson4courseModel.addNewLesson(lesson);
    res.json(lesson)
})

module.exports = router