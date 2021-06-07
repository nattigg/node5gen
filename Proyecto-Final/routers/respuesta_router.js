const express = require('express');
const {listar, guardar, borrar, actualizar} = require('../controller/respuesta_controller');
const router = express.Router();

//Rutas
router.get('/respuesta', listar);
router.post('/respuesta', guardar);
router.delete('/respuesta/:respuestaId', borrar);
router.put('/respuesta/:id', actualizar);

module.exports = router;