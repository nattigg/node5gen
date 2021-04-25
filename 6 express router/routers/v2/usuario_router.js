const express = require('express');
const { listar, guardar, borrar, actualizar, getusuario } = require('../../controller/usuario_controller');

const router = express.Router();

router.get('/usuario', listar);
router.post('/usuario', guardar);
router.delete('/usuario/:id', borrar);
router.put('/usuario/:id', actualizar);
router.get('/usuario/:id', getusuario);

module.exports = router;