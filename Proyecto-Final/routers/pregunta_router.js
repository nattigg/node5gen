const express = require('express');
const { isAuth, isAdmin } = require('../middleware/auth');
const {listar, guardar, borrar, actualizar} = require('../controller/pregunta_controller');
const router = express.Router();

//Rutas
router.get('/pregunta',isAuth,  listar);
router.post('/pregunta', isAuth,  guardar);
router.delete('/pregunta/:preguntaId',isAuth, isAdmin, borrar);
router.put('/pregunta/:id',isAuth, isAdmin, actualizar);

module.exports = router;