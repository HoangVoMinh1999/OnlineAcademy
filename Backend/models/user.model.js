const db = require('../utils/db')

module.exports = {
    all(){
        return db('user').where('isdeleted',0);
    },

    addteacher(obj){
        return db('user').insert(obj);
    },

    async singleById(id){
        const users = await db('user').where('isdeleted',false).andWhere('id',id);
        if (users != null && users.length > 0){
            return users[0];
        }
        return null;
    },

    async singleByUserName(username){
        const users = await db('user').where('isdeleted',false).andWhere('username',username);
        if (users != null && users.length > 0){
            return users[0];
        }
        return null;
    },

    async delete(id){
        const teacher = await this.singleById(id);
        if (teacher === null){
            return null;
        }
        return db('user').where('id',id).update({
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
        return db('user').where('id',id).update(obj);
    },

    
}