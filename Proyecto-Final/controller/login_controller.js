// login 
//Sinin
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const ModelUsuario = require('../models/usuario_model');

function errorHandler(data, next, err = null){
   
    if(err){
        return next(err);
    }

    if(!data){
       let error = new Error("Datos no existen");
       error.statusCode = 404;
       return next(error);
    }
}

function login(req, res, next){
    let email = req.body.email;
    let password = req.body.password;

    ModelUsuario.findOne( { email: email }, (err, docUsuario) =>{
        if( err || !docUsuario) return errorHandler(docUsuario, next, err)
        
        if(!bcrypt.compareSync(password, docUsuario.password)){
            return res.status(401).json({
                message : 'usuario o contrasenia incorrecto '
            });
        }

        let payload = {
            usaurioId : docUsuario._id,
            role : docUsuario.role
        }

        let token = jwt.sign(
            payload,
            process.env.TOKEN_KEY,
            { expiresIn : process.env.CADUCIDAD_TOKEN }
        )

        let user = docUsuario.toObject();
        delete user.password;
        delete user.cart;

        return res.json({
            usaurioId : docUsuario._id,
            role : docUsuario.role,
            token : token
        });

    }); 
}

function signup(req, res, next){
    console.log(req.body);

    let data = { 
        nombre : req.body.nombre,
        email: req.body.email,
        password : bcrypt.hashSync(req.body.password, 10),
        role : req.body.role
    }

    let modelusuario  = new ModelUsuario(data);
    modelusuario.save( (err, docUsuario) =>{
        if( err || !docUsuario) return errorHandler(docUsuario, next, err)
        
        return res.json({
            data:docUsuario
        });
    })
}

module.exports = {
    signup,
    login
}