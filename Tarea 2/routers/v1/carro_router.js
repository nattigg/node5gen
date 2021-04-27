const express = require('express');
const { addCarro, listarCarro, clearCarro, delItemCarro } = require('../../controller/carro_controller');

const router = express.Router();

//Rutas
router.post('/carro', addCarro);
router.get('/carro/:id', listarCarro);
router.delete('/carro/:id', clearCarro);
router.delete('/carro', delItemCarro);


module.exports = router;