const express = require('express');
const {listar, guardar, borrar, actualizar} = require('../controller/categoria_controller');
const router = express.Router();

//Rutas
router.get('/categoria', listar);
router.post('/categoria', guardar);
router.delete('/categoria/:categoriaId', borrar);
router.put('/categoria/:id', actualizar);

module.exports = router;