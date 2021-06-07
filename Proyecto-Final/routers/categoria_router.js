const express = require('express');
const { isAuth, isAdmin } = require('../middleware/auth');
const {listar, guardar, borrar, actualizar} = require('../controller/categoria_controller');
const router = express.Router();

//Rutas
router.get('/categoria',isAuth,  listar);
router.post('/categoria',isAuth,  guardar);
router.delete('/categoria/:categoriaId',isAuth, isAdmin , borrar);
router.put('/categoria/:id',isAuth, isAdmin , actualizar);

module.exports = router;