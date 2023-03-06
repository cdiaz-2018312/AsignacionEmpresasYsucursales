//Desestructuracion de los objetos
const { response, request } = require('express');
//Libreria para encriptacion
const bcrypt = require('bcryptjs');
//Importacion del modelo
const Sucursales = require('../models/sucursales');

const getSucursales = async (req = request, res = response) => {
    //Promesa para obtener los registros
    const listaSucursales = await Promise.all([
        Sucursales.countDocuments(),
        Sucursales.find()
    ]);

    //Impresion de registros
    res.status(201).json(listaSucursales);
};

const postSucursales = async (req = request, res = response) => {
    
    const { nombre } = req.body;
    //Datos obligatorios
    const SucursalesGuardada = new Sucursales({ nombre });
    
    //Guardar en base de datos
    await SucursalesGuardada.save();

    res.status(201).json(SucursalesGuardada);
};

const putSucursales = async (req = request, res = response) => {
    //Desestructuracion del parametro recibido a travez de la URL
    const { id } = req.params;
    //Evalua que el id del token sea igual al id a modificar
    //Si es asi lo modifica, si no, no lo modifica
    const {_id, ... resto}=req.body;
        
        
        //Editar usando el id
        const SucursalesEditada = await Sucursales.findByIdAndUpdate(id, resto, {new:true});
        res.status(201).json(SucursalesEditada);
   
    
};

const deleteSucursales = async (req = request, res = response) => {
    //Desestructuracion del parametro recibido a travez de la URL
    const { id } = req.params;
    //Evalua que el id del token sea igual al id a eliminar
    //Si es asi lo elimina, si no, no lo elimina
   
        const SucursalEliminada = await Sucursales.findByIdAndDelete(id);
        res.status(201).json(SucursalEliminada);
};

module.exports = {
    getSucursales, postSucursales, putSucursales, deleteSucursales
};