/**
 * Puerto del servidor
 */

process.env.PORT = process.env.PORT || 3000;

/**
 * Entorno
 */

process.env.NODE_ENV = process.env.NODE_ENV || 'dev'

/**
 * Base de datos
 */
let urlDB;

if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb+srv://user_node:BtB9R3ZKQkR5lYSy@cluster0-njfld.mongodb.net/iaero';
} else {
    urlDB = 'mongodb+srv://user_node:BtB9R3ZKQkR5lYSy@cluster0-njfld.mongodb.net/iaero';
}
process.env.URLDB = urlDB;

/**
 * Vigencia del token
 *  60 segundos
 *  60 minutos
 *  24 horas
 *  30 días
 */

process.env.CADUCIDAD_TOKEN = 60 * 60 * 24 * 30;


/**
 * SEED
 */

process.env.SEDD = process.env.SEDD || 'QkhE0pL6xACW';

/**
 * Google Client ID
 */

process.env.CLIENT_ID = process.env.CLIENT_ID || '178492123276-mnvd4qsl2d0fcbts8rqelgs525qm0isc.apps.googleusercontent.com';

process.env.PASSMYSQL = 'gygkaM-hixtiw-bydru6';