const { Schema, model } = require('mongoose');

const EmpresaSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
   
    password: {
        type: String,
        required: [true, 'El password es obligatorio']
    },
    rol: {
        type: String,
        required: true,
    },
    estado: {
        type: Boolean,
        default: true
    }
});

module.exports = model('Empresa', EmpresaSchema);