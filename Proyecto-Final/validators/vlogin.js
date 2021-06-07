const {body, validationmResult, validationResult} = require('express-validator');
const ModelUsaurio = require('../models/usuario_model');

const pSingUp =[
    // que el nombre no sea vacio
    body('nombre').trim().not().isEmpty()
        .withMessage('nombre requerido'),
    body('email').isEmail()
        .withMessage('Ingrese un mail valido.')
        .custom((value) => {
            return ModelUsaurio.findOne( { email : value } ).then(userDoc => {
                if(userDoc){
                    return Promise.reject('Este Correo ya Existe : validator')
                }
            })
        }),
    // minimo 5 caracteres luego el mensaje de los 5 caracteres
    // puede tener caracteres minusculas y mayusculas puede tener 
    // numeros, y esos caracteres especiales
    body('password').trim()
        .matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$.!%*#?&])/)
        .withMessage('debe tener numeros, caracteres minusculas, mayusculasy caracteres especiales')
        .isLength( { min:5 } )
        .withMessage('minimo 5 caracteres')
];

const vSingup = (req, res, next)=> {
    const errores = validationResult(req);
    if(!errores.isEmpty()){
        const myerror = new Error('Validacion fallo');
        myerror.statusCode = 422;
        myerror.data = errores.array();
        return next(myerror);
        
    }
    next();
} 

const validateSingUp = [pSingUp, vSingup];

module.exports = {
    validateSingUp
}