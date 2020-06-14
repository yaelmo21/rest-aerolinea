require('./config/config');
const colors = require('colors');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const DataBaseMyslq = require('./DB/database')
const app = express();

const db = new DataBaseMyslq();
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cors());
// parse application/json
app.use(bodyParser.json());
//Configuración global de rutas
app.use(require('./routes/index'));





app.get('/', (req, res) => {
    res.json({
        name: 'Api Rest iAero',
        resource: {
            vuelos: {
                name: 'vuelos',
                method: 'Get',
                description: 'Recupera los vuelos con determinado origen y destino',
                request: {
                    date: 'YYYY-MM-DD',
                    origin: 'CDM',
                    destination: 'Monterrey,NL'
                }
            },
            Asientos: {
                name: 'Asientos',
                method: 'Get',
                description: 'Recupera los asientos disponibles y ocupados de un vuelo',
                request: {
                    id_vuelo: 'Al',
                }
            }
        }
    });
});

app.get('/vuelos', (req, res) => {
    let body = req.body;


    db.getConnection().query('SELECT * FROM VUELO WHERE ORIGEN=? AND DESTINO= ? AND FECHA=?', [body.origin, body.destination, body.date], (err, result, fields) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err: 'Vuelo no encontrado'
            });
        }

        console.log(result[0].NUMERO);

        res.json(result);
    })
});





app.listen(process.env.PORT, () => {
    console.log('Escuchando en el puerto'.magenta, process.env.PORT);
});


mongoose.connect(process.env.URLDB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
}, (err, resp) => {
    if (err) throw err;
    console.log('Base de datos ONLINE');
});