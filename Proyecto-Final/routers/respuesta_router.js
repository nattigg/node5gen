const express = require('express');
const { isAuth, isAdmin } = require('../middleware/auth');
const {listar, guardar, borrar, actualizar} = require('../controller/respuesta_controller');
const router = express.Router();

//Rutas
router.get('/respuesta',isAuth,  listar);
router.post('/respuesta',isAuth,  guardar);
router.delete('/respuesta/:respuestaId',isAuth, isAdmin, borrar);
router.put('/respuesta/:id',isAuth, isAdmin, actualizar);

module.exports = router;