//Desestructuracion de los objetos
const { response, request } = require('express');
//Libreria para encriptacion
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
//Importacion del modelo
const Empresas = require('../models/empresas');


const getEmpresas = async (req = request, res = response) => {
    //Condiciones del get devuelve todos los usuarios con role alumno y estado true

    //Promesa para obtener los registros
    const listaEmpresas = await Promise.all([
        Empresas.countDocuments(),
       Empresas.find()
    ]);

    //Impresion de registros
    res.status(201).json(listaEmpresas);
};

const postEmpresas = async (req = request, res = response) => {
    //Desestructuracion objeto
    const { nombre,  password, rol } = req.body;
    //Datos obligatorios
    const EmpresaGuardada = new Empresas({ nombre,  password, rol });
    //Encriptar password
    const salt = bcrypt.genSaltSync(10);
    EmpresaGuardada.password = bcrypt.hashSync(password, salt);
    //Guardar en base de datos
    await EmpresaGuardada.save();

    res.status(201).json(EmpresaGuardada);
};

const putEmpresas = async (req = request, res = response) => {
    //Desestructuracion del parametro recibido a travez de la URL
    const token = req.header('x-token');
    if (!token) {
        return res.status(401).json('No hay token en la peticion');
    }
    const {uid}= jwt.verify(token, process.env.SECRET_KEY_FOR_TOKEN);
    const idEmpresa = await Empresas.findById(uid);
    //Si es asi lo modifica, si no, no lo modifica
    
        //Desestructuracion de los campos a reemplazar
        const {  _id,...resto } = req.body;
        //Editar usando el id
        const EmpresaEditada = await Empresas.findByIdAndUpdate(idEmpresa, resto, { new: true });
        res.status(201).json(EmpresaEditada);
    }
const deleteEmpresas = async (req = request, res = response) => {
    const token = req.header('x-token');
    //Desestructuracion del parametro recibido a travez de la URL
    const {uid}= jwt.verify(token,process.env.SECRET_KEY_FOR_TOKEN);
    const idEmpresa= await Empresas.findById(uid);
    //Evalua que el id del token sea igual al id a eliminar
    //Si es asi lo elimina, si no, no lo elimina
    
        const EmpresaDelete = await Empresas.findByIdAndUpdate(idEmpresa,{estado:false});
        res.status(201).json(EmpresaDelete);
    
        
} 

const findId = (uid, id) => {
    return uid == id;
}

module.exports = {
    getEmpresas, postEmpresas, putEmpresas, deleteEmpresas
};