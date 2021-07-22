// const { default: ChangePassword } = require('../../Frontend/client/src/Components/ChangePassword');
const db = require('../utils/db')

module.exports = {
    all(){
        return db('user').where('isdeleted',0);
    },

    register(obj){
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

    async singleByEmail(email){
        const users = await db('user').where('isdeleted',false).andWhere('email',email);
        if (users != null && users.length > 0){
            return users[0];
        }
        return null;
    },

    async delete(id){
        const user = await this.singleById(id);
        if (user === null){
            return null;
        }
        return db('user').where('id',id).update({
                                                    'isdeleted':true,
                                                    'Log_UpdatedDate': new Date(),
                                                    });
    },

    async update(id,obj){
        const user = await this.singleById(id);
        if (user === null){
            return null;
        }
        obj.Log_UpdatedDate = new Date();
        return db('user').where('id',id).update(obj);
    },

    async updateRfToken(id,rfToken){
        const user = await this.singleById(id);
        if (user === null){
            return null;
        }
        user.Log_UpdatedDate = new Date();
        user.rfToken = rfToken
        return db('user').where('id',id).update(user);
    },

    async isValidRFToken(id,rfToken){
        const user = await this.singleById(id);
        if (user === null){
            return null;
        }
        if (user.rfToken === rfToken){
            return true;
        }
        return false;
    },

    async confirmAccount(id,data){
        return db('user').where('isdeleted',false).andWhere('id',id).update(data);
    },

    async changePassword(id, newHashPassword) {
        const user = await this.singleById(id);
        if (user === null) {
            return null;
        }
        return db('user').where('id',id).update({'password': newHashPassword})
    }
}