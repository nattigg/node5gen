const express = require('express');
const { listar, guardar, borrar, actualizar, getcategoria } = require('../controller/categoria_controller');

const router = express.Router();

router.get('/categoria', listar);
router.post('/categoria', guardar);
router.delete('/categoria/:id', borrar);
router.put('/categoria/:id', actualizar);
router.get('/categoria/:id', getcategoria);

module.exports = router;