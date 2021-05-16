const db = require('../utils/db')

module.exports = {
    all(){
        return db('teacher').where('isdeleted',0);
    },

    addteacher(obj){
        return db('teacher').insert(obj);
    },

    async singleById(id){
        const categories = await db('teacher').where('isdeleted',false).andWhere('id',id);
        if (categories != null && categories.length > 0){
            return categories[0];
        }
        return null;
    },

    async singleByName(name){
        const categories = await db('teacher').where('isdeleted',false).andWhere('name',name);
        if (categories != null && categories.length > 0){
            return categories[0];
        }
        return null;
    },

    async delete(id){
        const teacher = await this.singleById(id);
        if (teacher === null){
            return null;
        }
        return db('teacher').where('id',id).update({
                                                    'isdeleted':true,
                                                    'Log_UpdatedDate': new Date(),
                                                    });
    },

    async update(id,obj){
        const teacher = await this.singleById(id);
        if (teacher === null){
            return null;
        }
        obj.Log_UpdatedDate = new Date();
        return db('teacher').where('id',id).update(obj);
    }
}