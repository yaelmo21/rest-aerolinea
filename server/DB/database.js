const mysql = require('mysql');
const colors = require('colors');
mysql.createPool({
    connectionLimit: 10,
    host: 'example.org',
    user: 'bob',
    password: 'secret',
    database: 'my_db'
});

class DataBaseMyslq {

    conexion = mysql.createConnection({
        host: '3.15.219.220',
        database: 'aerolinea',
        user: 'aerolinea',
        password: process.env.PASSMYSQL,
    });

    getConnection = () => {
        if (this.conexion.state == 'disconnected') {
            this.conexion.connect((err => (err) ? console.log(err) : console.log('Conectado MYSQL'.blue)));
            return this.conexion;
        } else {
            return this.conexion;
        }
    }



}


module.exports = DataBaseMyslq;