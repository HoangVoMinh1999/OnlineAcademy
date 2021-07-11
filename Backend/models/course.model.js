const db = require('../utils/db')

module.exports = {
    all(){
        return db('course').where('isdeleted',0);
    },

    addcourse(obj){
        return db('course').insert(obj);
    },

    async singleById(id){
        const categories = await db('course').where('isdeleted',false).andWhere('id',id);
        if (categories != null && categories.length > 0){
            return categories[0];
        }
        return null;
    },

    async singleByName(name){
        const categories = await db('course').where('isdeleted',false).andWhere('name',name);
        if (categories != null && categories.length > 0){
            return categories[0];
        }
        return null;
    },

    async delete(id){
        const course = await this.singleById(id);
        if (course === null){
            return null;
        }
        return db('course').where('id',id).update({
                                                    'isdeleted':true,
                                                    'Log_UpdatedDate': new Date(),
                                                    });
    },
    

    async update(id,obj){
        const course = await this.singleById(id);
        if (course === null){
            return null;
        }
        obj.Log_UpdatedDate = new Date();
        return db('course').where('id',id).update(obj);
    },

    async updateView(id){
        const course = await this.singleById(id);
        if (course === null){
            return null;
        }
        return db('course').where('id',id).update({
                                                    'view':course.view + 1,
                                                    'Log_UpdatedDate': new Date(),
                                                    });
    },


    async updateImage(id,img,src){
        const course = await this.singleById(id);
        if (course === null){
            return null;
        }
        return db('course').where('id',id).update({'image':img,'Image_Source': src})
    },

    fullTextSearch4Course(name_course){
        return db('course').whereRaw('Match(name) against(?)', name_course)
    },

    paging4Course(page,limit){
        return db('course').limit(limit).offset(page - 1);
    },

    getCourseByCategory(category_id){
        return db('course').where('isdeleted',false).andWhere('category_id',category_id);
    }
}