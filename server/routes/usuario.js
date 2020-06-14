const express = require('express');
const bcrypt = require('bcrypt');
const Usuario = require('../models/usuario');
const { verificarToken } = require('../middlewares/autenticacion');
const app = express();

app.post('/usuario', function(req, res) {
    let body = req.body;

    let usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
    });

    usuario.save((err, usuarioDB) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                error: {
                    code: 'R-1',
                    message: 'El email ya se encuentra asociado a otra cuenta',
                }
            });
        }



        res.json({
            ok: true,
            usuario: usuarioDB
        });

    });

});

app.get('/usuario', verificarToken, function(req, res) {

    let id = req.usuario._id;
    Usuario.find({ _id: id })
        .exec((err, usuarioDB) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }
            res.json({
                ok: true,
                user: usuarioDB
            });

        });



});

module.exports = app;