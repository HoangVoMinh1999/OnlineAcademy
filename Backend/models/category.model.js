const db = require('../utils/db')

module.exports = {
    all(){
        return db('category').where('isdeleted',0);
    },

    pagination(offset,limit){
        return db('category').limit(limit).offset(offset);
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
        obj.id = category.id;
        return db('category').where('id',id).update(obj);
    },

    async deleteChildren(category_id){
        const children = await db('category').where('category_id',category_id).andWhere('isdeleted',false);
        if (children !== null && children.length > 0){
             children.map(async (category) => {
                await this.delete(category.id);
                return null;
            })
        }
        return null;
    },

    listChildCategory(category_id){
        return db('category').where('category_id',category_id).andWhere('isdeleted',false);
    }
}