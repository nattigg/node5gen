// login 
//Sinin

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

function signup(req, res, next){
    console.log(req.body);

    let data = { 
        nombre : req.body.nombre,
        email: req.body.email,
        password : req.body.password

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
    signup
}