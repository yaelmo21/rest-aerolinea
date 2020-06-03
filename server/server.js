require('./config/config');
const colors = require('colors');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./DB/database').conexion;
const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

//Configuración global de rutas
app.use(require('./routes/index'));

app.use(cors());

// parse application/json
app.use(bodyParser.json())

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
    db.query('SELECT * FROM VUELO WHERE ORIGEN=? AND DESTINO= ? AND FECHA=?', [body.origin, body.destination, body.date], (err, result, fields) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err: 'Vuelo no encontrado'
            });
        }


        res.json(result);
    })
});



db.connect(function(err) {
    if (err) console.log('No es posible conectar a la base de datos'.red);
    else console.log('Conexión establecida'.blue);
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