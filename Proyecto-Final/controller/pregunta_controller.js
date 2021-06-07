const ModelPregunta = require('../models/pregunta_model')

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

// get pregunta
function listar(req, res, next){
    ModelPregunta.find()
    .select()
    .exec((err, items) =>{
        if(err || !items){
            return errorHandler(items, next, err);
        }

        return res.json({
            preguntas : items
        })
    });
}

// nueva pregunta
function guardar(req, res, next){
    let data = {
        pregunta_texto : req.body.pregunta_texto,
        categoria : req.body.categoria
    }

    let modelPregunta = new ModelPregunta(data);

    modelPregunta.save((err, docPregunta)=>{
        if(err || !docPregunta){
            return errorHandler(docPregunta, next, err);
        }
        return res.json({
            data:docPregunta
        })
    });

}

// borrar pregunta
function borrar(req, res, next){
    const id = req.params.preguntaId;

    ModelPregunta.findByIdAndRemove(id, (err, docPregunta) =>{
        if(err || !docPregunta){
            return errorHandler(docPregunta,next, err);
        }

        return res.json({
            data:docPregunta
        })
    });
}

function actualizar(req, res, next){
    const id = req.params.id;
    
    ModelPregunta.findByIdAndUpdate(id, 
            {
                pregunta_texto : req.body.pregunta_texto,
                categoria : req.body.categoria
            }, 
            {next : true}, (err,docPregunta) =>{
        if(err || !docPregunta){
            return errorHandler(docPregunta,next, err);
        }

        return res.json({
            data:docPregunta
        })
    });
}

module.exports = {
    listar, guardar, borrar, actualizar
}