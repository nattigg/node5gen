const ModelCategoria = require('../models/categoria_model')

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

// get categoria
function listar(req, res, next){
    ModelCategoria.find()
    .select()
    .exec((err, items) =>{
        if(err || !items){
            return errorHandler(items, next, err);
        }

        return res.json({
            categorias : items
        })
    });
}

// nueva categoria
function guardar(req, res, next){
    console.log(req.body.formulario);
    let data = {
        categoria_texto : req.body.categoria_texto,
        formulario : req.body.formulario
    }

    let modelcategoria = new ModelCategoria(data);

    modelcategoria.save((err, docCategoria)=>{
        if(err || !docCategoria){
            return errorHandler(docCategoria, next, err);
        }
        return res.json({
            data:docCategoria
        })
    });

}

// borrar Categoria
function borrar(req, res, next){
    const id = req.params.categoriaId;

    ModelCategoria.findByIdAndRemove(id, (err, docCategoria) =>{
        if(err || !docCategoria){
            return errorHandler(docCategoria,next, err);
        }

        return res.json({
            data:docCategoria
        })
    });
}

function actualizar(req, res, next){
    const id = req.params.id;
    
    ModelCategoria.findByIdAndUpdate(id, 
            {
                categoria_texto : req.body.categoria_texto
            }, 
            {next : true}, (err,docCategoria) =>{
        if(err || !docCategoria){
            return errorHandler(docCategoria,next, err);
        }

        return res.json({
            data:docCategoria
        })
    });
}

module.exports = {
    listar, guardar, borrar, actualizar
}