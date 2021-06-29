const db = require('../utils/db');
const COMMENT = 'comment'

module.exports = {
    allComment4Course(course_id){
        return db(COMMENT).where('IsDeleted',false).andWhere('course_id',course_id);
    },
    async single(user_id,course_id){
        let comment = await db(COMMENT).where('user_id',user_id).andWhere('course_id',course_id).andWhere('IsDeleted',false);
        if (comment !== null && comment.length > 0){
            return comment[0];
        }        
        return null;
    },
    async addComment4Course(obj){
        let comment = await this.single(obj.user_id,obj.course_id);
        if (comment !== null){
            return null;
        }
        return db(COMMENT).insert(obj);
    },

    async updateComment(obj){
        let comment = await this.single(obj.user_id,obj.course_id);
        if (comment === null){
            return null;
        }
        return db(COMMENT).where('user_id',obj.user_id).andWhere('course_id',obj.course_id).update(obj);
    }
}