  //Libreria para las rutas
const { Router } = require('express');
//Libreria para las validaciones
const { check } = require('express-validator');
//Controllers
const { login } = require('../controllers/auth');
//Middlewares
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();

//Manejo de rutas
router.post('/login', [
    check('nombre','El nombre de la empresa es obligatorio').not().isEmpty(),
    check('password', 'El password es obligatorio').not().isEmpty(),
    validarCampos
], login);

module.exports = router;