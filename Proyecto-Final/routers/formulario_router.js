const express = require('express');
const { isAuth, isAdmin } = require('../middleware/auth');
const {listar, guardar, borrar, actualizar} = require('../controller/formulario_controller');
const router = express.Router();

//Rutas
// para las rutas que tienen isAdmin el usuario se debe crear
// con el ROL = ADMIN_ROLE
router.get('/formulario',isAuth, isAdmin , listar);
router.post('/formulario',isAuth, isAdmin , guardar);
router.delete('/formulario/:formularioId',isAuth, isAdmin , borrar);
router.put('/formulario/:id',isAuth, isAdmin , actualizar);

module.exports = router;