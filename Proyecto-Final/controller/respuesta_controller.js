const ModelRespuesta = require('../models/respuesta_model');

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

// get respuestas de una pregunta
function listar(req, res, next){
    ModelRespuesta.find()
        .select()
        .exec((err, items) =>{
            if(err || !items){
                return errorHandler(items, next, err);
            }

            return res.json({
                items : items
            })
        });
}

// nueva respuesta para una pregunta
function guardar(req, res, next){
    let data = {
        respuesta_texto : req.body.respuesta_texto,
        preguntaid : req.body.preguntaid
    }

    let modelRespuesta = new ModelRespuesta(data);

    modelRespuesta.save((err, docRespuesta)=>{
        if(err || !docRespuesta){
            return errorHandler(docRespuesta, next, err);
        }
        return res.json({
            data:docRespuesta
        })
    });
}

// borrar respuesta para una pregunta
function borrar(req, res, next){
    
    const id = req.params.respuestaId;

    ModelRespuesta.findByIdAndRemove(id, (err, docRespuesta) =>{
        if(err || !docRespuesta){
            return errorHandler(docRespuesta,next, err);
        }

        return res.json({
            data:docRespuesta
        })
    });
    
}

function actualizar(req, res, next){
    const id = req.params.id;
    
    ModelRespuesta.findByIdAndUpdate(id, {respuesta_texto : req.body.respuesta_texto}, {next : true}, (err,docRespuesta) =>{
        if(err || !docRespuesta){
            return errorHandler(docRespuesta,next, err);
        }

        return res.json({
            data:docRespuesta
        })
    });
}

module.exports = {
    listar, guardar, borrar, actualizar
}