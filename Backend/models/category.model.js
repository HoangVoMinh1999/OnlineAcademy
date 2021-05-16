const db = require('../utils/db')

module.exports = {
    all(){
        return db('category').where('isdeleted',0);
    },

    addCategory(obj){
        return db('category').insert(obj);
    },

    async singleById(id){
        const categories = await db('category').where('isdeleted',false).andWhere('id',id);
        if (categories != null && categories.length > 0){
            return categories[0];
        }
        return null;
    },

    async singleByName(name){
        const categories = await db('category').where('isdeleted',false).andWhere('name',name);
        if (categories != null && categories.length > 0){
            return categories[0];
        }
        return null;
    },

    async delete(id){
        const category = await this.singleById(id);
        if (category === null){
            return null;
        }
        return db('category').where('id',id).update({
                                                    'isdeleted':true,
                                                    'Log_UpdatedDate': new Date(),
                                                    });
    },

    async update(id,obj){
        const category = await this.singleById(id);
        if (category === null){
            return null;
        }
        obj.Log_UpdatedDate = new Date();
        return db('category').where('id',id).update(obj);
    }
}