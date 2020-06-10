/**
 * Verificar token
 */
const jwt = require('jsonwebtoken');

let verificarToken = (req, res, next) => {

    let token = req.get('Authorization');
    //vericiar si token es valido
    jwt.verify(token, process.env.SEDD, (err, decoded) => {
        if (err) {
            return res.status(401).json({
                ok: false,
                err: {
                    message: 'token no valido'
                }
            });
        }

        req.usuario = decoded.usuario;
        next();

    });


}



/**
 * Verica token imagen
 */

let verificarTokenImg = (req, res, next) => {

    let token = req.query.token;
    //vericiar si token es valido
    jwt.verify(token, process.env.SEDD, (err, decoded) => {
        if (err) {
            return res.status(401).json({
                ok: false,
                err: {
                    message: 'token no valido'
                }
            });
        }

        req.usuario = decoded.usuario;
        next();

    });


}


module.exports = {
    verificarToken,
    verificarTokenImg
}