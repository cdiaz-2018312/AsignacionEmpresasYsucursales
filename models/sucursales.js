const { Schema, model } = require('mongoose');

const SucursalesSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
        unique: true
        
   }   
});

module.exports = model('Sucursales', SucursalesSchema);