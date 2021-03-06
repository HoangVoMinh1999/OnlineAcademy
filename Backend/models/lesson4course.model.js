const db = require ('../utils/db')

module.exports = {
    getLessonByCourseId(course_id){
        return db('lessons4course').where('isdeleted',false).andWhere('course_id',course_id)
    },

    addNewLesson(obj){
        return db('lessons4course').insert(obj);
    },

    async singleById(id){
        let lesson = await db('lessons4course').where('isdeleted',false).andWhere('id',id)
        if (lesson !== null && lesson.length > 0){
            return lesson[0];
        }
        return null;
    },

    async updateLesson(id,obj){
        let lesson = await this.singleById(id);
        if (lesson === null){
            return null;
        }
        obj.id = lesson.id;
        obj.Log_UpdatedDate = new Date();
        return db('lessons4course').where('id',id).update(obj)
    },

    async delete(id){
        let lesson = await this.singleById(id);
        if (lesson === null){
            return null;
        }
        lesson.Log_UpdatedDate = new Date();
        lesson.IsDeleted = true;
        return db('lessons4course').where('id',id).update(lesson);
    },

    async updateVideo(id,video){
        const course = await this.singleById(id);
        if (course === null){
            return null;
        }
        return db('lessons4course').where('id',id).update({'video':video})
    },
}