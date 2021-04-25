const express = require('express');
const { listar, guardar, borrar, actualizar, getproducto } = require('../../controller/producto_controller');

const router = express.Router();

router.get('/producto', listar);
router.post('/producto', guardar);
router.delete('/producto/:id', borrar);
router.put('/producto/:id', actualizar);
router.get('/producto/:id', getproducto);

module.exports = router;