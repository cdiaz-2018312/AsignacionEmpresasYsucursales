//Importaciones
const { Router } = require('express');
const { getSucursales, postSucursales, putSucursales, deleteSucursales } = require('../controllers/sucursales');


const router = Router();

router.get('/mostrar', getSucursales);
router.post('/agregar',  postSucursales);
router.put('/modificar/:id', putSucursales);
router.delete('/eliminar/:id', deleteSucursales);

module.exports = router;