const { Schema, model } = require('mongoose');

const EmpresasSucursalesSchema = Schema({
    empresa: {
        type: Schema.Types.ObjectId,
        ref:'Empresas'
    },
    sucursales: [{
        type: Schema.Types.ObjectId,
        ref: 'Sucursales',
        
    }]
});
//Que lenguaje se usa para desarrollo web, js, java, php, respuesta correcta todos los anteriores
module.exports = model('Empresas-sucursales', EmpresasSucursalesSchema);