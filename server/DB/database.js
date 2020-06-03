const mysql = require('mysql');
let conexion = mysql.createConnection({
    host: '3.15.219.220',
    database: 'aerolinea',
    user: 'aerolinea',
    password: 'gygkaM-hixtiw-bydru6',
});


module.exports = {
    conexion,
}