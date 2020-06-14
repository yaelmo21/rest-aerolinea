const express = require('express');
const Compra = require('../models/compra');
const DataBaseMyslq = require('../DB/database');
const { verificarToken } = require('../middlewares/autenticacion');
const app = express();
const db = new DataBaseMyslq();

app.post('/compra', verificarToken, async(req, res) => {

    let body = req.body;





    db.getConnection().query('UPDATE ASIENTO SET ESTADO=0 WHERE ID=?', [body.idAsiento], (err) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err: {
                    code: 'R-3',
                    message: err,
                }
            });

        }

        db.getConnection().query('SELECT * FROM VUELO WHERE NUMERO=?', [body.numeroVuelo], (err, result) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err: {
                        code: 'R-4',
                        message: err,
                    }
                });

            }
            let compra = new Compra({
                nombre: body.nombre,
                email: body.email,
                phone: body.phone,
                idAsiento: body.idAsiento,
                codigoAsiento: body.codigoAsiento,
                numeroVuelo: body.numeroVuelo,
                origen: result[0].ORIGEN,
                destino: result[0].DESTINO,
                fecha: result[0].FECHA,
                hora: result[0].HORA,
                usuario: req.usuario._id

            });

            compra.save((err, compraDB) => {

                if (err) {
                    return res.status(400).json({
                        ok: false,
                        error: {
                            code: 'R-5',
                            message: err,
                        }
                    });
                }


                res.json(compraDB);

            });


        });





    });




});


app.get('/compras', verificarToken, (req, res) => {
    let id = req.usuario._id;
    Compra.find({ usuario: id })
        .exec((err, compra) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }
            res.json({
                ok: true,
                compra
            });

        });


});

app.put('/compra/:id', verificarToken, (req, res) => {
    let id = req.params.id;
    Compra.findByIdAndUpdate(id, { estado: false }, { new: true, runValidators: true },
        (err, compra) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }
            res.json({
                ok: true,
                compra
            });

        });


});




module.exports = app;