//Importaciones
const { Router } = require('express');
const { check } = require('express-validator');
const { getEmpresaSucursal, postEmpresaSucursal, putEmpresaSucursal, deleteEmpresaSucursal } = require('../controllers/empresas-sucursales');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const {existeEmpresaSucursalById}= require ('../helpers/db-validators');


const router = Router();

router.get('/mostrar', [
    validarJWT
], getEmpresaSucursal);
router.post('/agregar', [
    validarJWT,
    check('Empresa', 'El nombre de la sucursal es obligatoria').not().isEmpty(),
    check('Sucursales', 'introduzca alguna sucursal de los municipios de la capital').not().isEmpty(),
    validarCampos,
    
], postEmpresaSucursal);
router.put('/asignar/:id', [
    validarJWT,
    check('id', 'No es un ID valido').isMongoId(),
    validarCampos
], putEmpresaSucursal);
router.delete('/eliminar/:id', [
    validarJWT,
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(existeEmpresaSucursalById),
    validarCampos
], deleteEmpresaSucursal);

module.exports = router;