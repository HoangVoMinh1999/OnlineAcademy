const db = require('../utils/db')

module.exports = {
    getPurchasedCourseByUserId(user_id){
        return db('purchasedcourse').where('IsDeleted',false).andWhere('user_id',user_id);
    },

    async singlePurchaseCourse(user_id,course_id){
        let course = await db('purchasedcourse').where('user_id',user_id).andWhere('course_id',course_id).andWhere('IsDeleted',false);
        if (course !== null && course.length > 0){
            return course[0];
        }
        return null;
    },

    async addCourseByUserID(obj){
        let course = await this.singlePurchaseCourse(obj.user_id,obj.course_id);
        if (course === null){
            return db('purchasedcourse').insert(obj);
        }
        return null;
    },

    async deleteCourseByUserId(user_id,course_id){
        let course = await this.singlePurchaseCourse(user_id,course_id);
        if (course !== null){
            course.IsDeleted = true;
            course.Log_UpdatedDate = new Date();
            delete course.id;
            return db('purchasedcourse').where('user_id',user_id).andWhere('course_id',course_id).update(course);
        }
        return null;
    },
}