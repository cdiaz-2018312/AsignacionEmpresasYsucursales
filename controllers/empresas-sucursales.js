//Desestructuracion de los objetos
const { response, request } = require('express');
//Importacion del modelo
const EmpresasSucursales= require('../models/empresas-sucursales');


const getEmpresaSucursal = async (req = request, res = response) => {
    //Promesa para obtener los registros
    const listaEmpresaSucursal = await Promise.all([
        EmpresasSucursales.countDocuments(),
        EmpresasSucursales.find().populate('empresa','nombre').populate('sucursales', 'nombre')
    ]);

    //Impresion de registros
    res.status(201).json(listaEmpresaSucursal);
};

const postEmpresaSucursal = async (req = request, res = response) => {
    //Desestructuracion objeto
    
    const { empresa, sucursales } = req.body;
    //Datos obligatorios
    const EmpresasSucursalGuardada = new EmpresasSucursales({ empresa, sucursales });
    
    //Guardar en base de datos
    await EmpresasSucursalGuardada.save();

    res.status(201).json(EmpresasSucursalGuardada);
};
const putEmpresaSucursal = async (req = request, res = response) => {
    //Desestructuracion objeto
    const { id } = req.params;

    const EmpresaSucursalDB = await EmpresasSucursales.findById(id);
            //meterle la info al array
            const data = { _id: req.body.Sucursales };
            EmpresaSucursalDB.sucursales.push(data);
            await EmpresaSucursalDB.save();
            res.status(201).json(EmpresaSucursalDB);
}

const deleteEmpresaSucursal= async(req=request,res=response)=>{
    const {id}= req.params;

    const EmpresaSucursalDelete=await EmpresasSucursales.findByIdAndDelete(id);
    res.status(201).json(EmpresaSucursalDelete);
}

module.exports = {
    getEmpresaSucursal, putEmpresaSucursal,postEmpresaSucursal,deleteEmpresaSucursal
};