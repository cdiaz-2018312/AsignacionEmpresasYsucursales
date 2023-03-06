
const Empresas = require('../models/empresas');

const empresasSucursales = require('../models/empresas-sucursales');
//Este archivo maneja validaciones personalizadas

const nombreExistente = async (nombre = '') => {
    //Verificacion si el nombre ya existe en la BD
    const existeNombre = await Empresas.findOne({ nombre })

    if (existeNombre) {
        throw new Error(` el ${nombre} ya esta registrado en la BD, ingrese uno nuevo`);
    }
}

const existeEmpresaById = async (id) => {
    //Verificar si el ID existe
    const existeId = await Empresas.findById(id);

    if (!existeId) {
        throw new Error(`El id ${id} no existe en la BD`);
    }
}
const existeEmpresaSucursalById = async (id) => {
    //Verificar si el ID existe
    const existeId = await empresasSucursales.findById(id);

    if (!existeId) {
        throw new Error(`El id ${id} no existe en la BD`);
    }
}


module.exports = {
    nombreExistente, existeEmpresaSucursalById
}