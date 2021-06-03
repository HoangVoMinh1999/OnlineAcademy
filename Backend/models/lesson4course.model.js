const db = require ('../utils/db')

module.exports = {
    getLessonByCourseId(course_id){
        return db('lessons4course').where('isdeleted',false).andWhere('course_id',course_id)
    },

    addNewLesson(obj){
        return db('lessons4course').insert(obj);
    }
}