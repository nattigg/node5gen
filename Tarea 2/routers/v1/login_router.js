const express = require('express');
const { signup } = require('../../controller/login_controller');

const router = express.Router();

//Rutas
router.post('/signup', signup);


module.exports = router;