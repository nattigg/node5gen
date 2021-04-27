const express = require('express');
const { listar, guardar, borrar, actualizar, getproducto, productoById } = require('../../controller/producto_controller');

const router = express.Router();

//Params
router.param('productoId', productoById);


//Rutas
router.get('/producto', listar);
router.post('/producto', guardar);
router.delete('/producto/:productoId', borrar);
router.put('/producto/:id', actualizar);
router.get('/producto/:productoId', getproducto);

module.exports = router;