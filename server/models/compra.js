const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
let Schema = mongoose.Schema;

let compraSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es necesario']
    },
    email: {
        type: String,
        required: [true, 'El Email es necesario'],


    },
    phone: {
        type: String,
        default: '',
    },
    origen: {
        type: String,
        required: [true, 'El origen  es necesario'],

    },
    destino: {
        type: String,
        required: [true, 'El destino  es necesario'],

    },
    fecha: {
        type: String,
        required: [true, 'La fecha  es necesaria'],
    },
    hora: {
        type: String,
        required: [true, 'La hora es necesaria'],
    },
    idAsiento: {
        type: String,
        required: [true, 'El id del asiento es necesario'],
        unique: true
    },
    codigoAsiento: {
        type: String,
        required: [true, 'El código del asiento es necesario'],

    },
    numeroVuelo: {
        type: Number,
        required: [true, 'El número de vuelo es requerido'],
    },
    estado: {
        type: Boolean,
        default: true
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario'
    }
});

compraSchema.plugin(uniqueValidator, {
    message: '{PATH} debe ser único'
});

module.exports = mongoose.model('Compra', compraSchema);