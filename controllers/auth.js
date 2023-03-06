//Importaciones necesarias
const { request, response } = require('express');
//Importacion modelo
const Empresas = require('../models/empresas');
//Libreria para desencriptar el password
const bcrypt = require('bcryptjs');
//Importando el helper para generar token
const { generarJWT } = require('../helpers/generar-jwt');

const login = async (req = request, res = response) => {
    //Desestructuracion parametros recibidos en el body
    const { nombre, password } = req.body;

    try {
        //Verificar si el nombre de la empresa existe
        const empresas = await Empresas.findOne({ nombre });
        if (!empresas) {
            return res.status(400).json("no existe una empresa con ese nombre en la base de datos");
        }
        
        //Verificar el password
        const validarPassword = bcrypt.compareSync(password, empresas.password);
        if (!validarPassword) {
            return res.status(400).json('la contraseña no coincide con la contraseña  registrada');
        }
        //Generar JWT
        const token = await generarJWT(empresas.id);
        res.status(202).json({ msg: `empresa  ${empresas.nombre} este es su token`, token });
    } catch (error) {
        console.log(error);
        res.status(500).json('la empresa no esta registrada');
    }
}

module.exports = {
    login
}