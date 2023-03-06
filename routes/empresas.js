//Importaciones
const { Router } = require('express');
const { check } = require('express-validator');
const { getEmpresas, postEmpresas, putEmpresas, deleteEmpresas } = require('../controllers/empresas');
const { nombreExistente, existeUsuarioById } = require('../helpers/db-validators.js');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');


const router = Router();

router.get('/mostrar', getEmpresas);
router.post('/agregar', [
    check('nombre', 'El nombre del usuario es obligatorio').not().isEmpty(),
    check('rol', 'El rol es obligatorio').not().isEmpty(),
    check('password', 'El password debe ser de mas de 6 digitos').isLength({min: 6}),
    check('nombre').custom(nombreExistente),
    validarCampos
], postEmpresas);
router.put('/modificar/',  putEmpresas);

router.delete('/eliminar', [
    validarJWT
], deleteEmpresas);

module.exports = router;