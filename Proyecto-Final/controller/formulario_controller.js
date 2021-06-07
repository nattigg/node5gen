const ModelFormulario = require('../models/formulario_model')

function errorHandler(data, next, err = null){
    if(err){
        return next(err);
    }

    if(!data){
       let error = new Error("Datos no existe");
       error.statusCode = 404;
       return next(error);
    }
}

// get formulario
function listar(req, res, next){
    ModelFormulario.find()
    .select()
    .exec((err, items) =>{
        if(err || !items){
            return errorHandler(items, next, err);
        }

        return res.json({
            formularios : items
        })
    });
}

// nueva formulario
function guardar(req, res, next){
    let data = {
        formulario_nombre : req.body.formulario_nombre,
        
    }

    let modelformulario = new ModelFormulario(data);

    modelformulario.save((err, docFormulario)=>{
        if(err || !docFormulario){
            return errorHandler(docFormulario, next, err);
        }
        return res.json({
            data:docFormulario
        })
    });

}

// borrar formulario
function borrar(req, res, next){
    const id = req.params.formularioId;

    ModelFormulario.findByIdAndRemove(id, (err, docFormulario) =>{
        if(err || !docFormulario){
            return errorHandler(docFormulario,next, err);
        }

        return res.json({
            data:docFormulario
        })
    });
}

function actualizar(req, res, next){
    const id = req.params.id;
    
    ModelFormulario.findByIdAndUpdate(id, 
            {
                formulario_nombre : req.body.formulario_nombre
            }, 
            {next : true}, (err,docFormulario) =>{
        if(err || !docFormulario){
            return errorHandler(docFormulario,next, err);
        }

        return res.json({
            data:docFormulario
        })
    });
}

module.exports = {
    listar, guardar, borrar, actualizar
}