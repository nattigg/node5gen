const {validateSingUp} = require('../validators/vlogin');
const express = require('express');

const{
    signup, login
} = require('../controller/login_controller');

const router = express.Router();


router.post('/signup',validateSingUp, signup);
router.post('/login',login);

module.exports = router;
