// const knex = require('knex')({
//     client : 'mysql2',
//     connection : {
//         host :'bqc7asb51mcp9vbivofa-mysql.services.clever-cloud.com',
//         user : 'usco6iwrszp1ksoj',
//         password : 'k4VdcY0Ta8IP6F4Hv12W',
//         database : 'bqc7asb51mcp9vbivofa'
//     },
//     pool: { min: 0, max: 5 }
// })


const knex = require('knex')({
    client : 'mysql2',
    connection : {
        host :'localhost',
        user : 'root',
        password : '1104',
        database : 'onlineacademy'
    },
    pool: { min: 0, max: 5 }
})
module.exports = knex;