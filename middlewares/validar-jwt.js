//Importaciones
const { response, request } = require('express');
const jwt = require('jsonwebtoken');
//Importacion modelo
const Empresas = require('../models/empresas')

const validarJWT = async (req = request, res = response, next) => {
    //Solicitud del token en el header
    const token = req.header('x-token');
    
    //Verificar si el token enviado existe
    if (!token) {
        return res.status(401).json('No hay token en la peticion');
    }

    try {
        //Verificacion del token con una llave privada para decodificar el token
        const { uid } = jwt.verify(token, process.env.SECRET_KEY_FOR_TOKEN);

        //Extrer informacion del usuario que corresponda el uid
        const empresas = await Empresas.findById(uid);

        //Verificar si el uid del usuario no existe
        if (!empresas) {
            return req.status(400).json('Token no valido - empresa no registrada');
        }

       
        //Sigue con la ejecucion
        req.empresas = empresas;
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json('Token no valido');
    }

}

module.exports = {
    validarJWT
}