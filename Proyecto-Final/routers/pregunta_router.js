const express = require('express');
const {listar, guardar, borrar, actualizar} = require('../controller/pregunta_controller');
const router = express.Router();

//Rutas
router.get('/pregunta', listar);
router.post('/pregunta', guardar);
router.delete('/pregunta/:preguntaId', borrar);
router.put('/pregunta/:id', actualizar);

module.exports = router;