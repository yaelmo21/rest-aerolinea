const mysql = require('mysql');
let conexion = mysql.createConnection({
    host: '3.15.219.220',
    database: 'aerolinea',
    user: 'aerolinea',
    password: process.env.PASSMYSQL,
});


module.exports = {
    conexion,
}