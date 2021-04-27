const ModelCategoria = require('../models/categoria_model');

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

// Listar
function listar(req, res, next) {
    ModelCategoria.find().exec( (err, items) =>{
        if( err || !items){
            console.log("Error...");
            console.log(items);
            console.log(err);
            return errorHandler(items, next, err)

        }
        

        return res.json({
            items : items
        })
    });
}

// get categoria 
function getcategoria(req, res) {
    let id = req.params.id;

    ModelCategoria.findById(id, (err, docCategoria) => {
        if( err || !docCategoria)
        
        return errorHandler(docCategoria, next, err)

        return res.json({
          data : docCategoria
        })

    });

    
}

//Guardar
function guardar(req, res, next){

    //console.log(req.body);
   
    let data = {
        categoria_nombre : req.body.categoria_nombre
    }

    modelCategoria = new ModelCategoria(data);
    modelCategoria.save((err, docCategoria) => {
        
        if( err || !docCategoria) return errorHandler(docCategoria, next, err)
    
        return res.json({
            data:docCategoria
        });
    });

}

//Borrar
function borrar(req, res) {
    const id = req.params.id;
    ModelCategoria.findByIdAndRemove(id, (err, docCategoria) =>{
        if( err || items)
        
        return errorHandler(items, next, err)

        return res.json({
            data:docCategoria
        });
    });
}

//Actualizar
function actualizar(req, res){
    const id = req.params.id;

    const data = {
        categoria_nombre : req.body.categoria_nombre
    }
    
    ModelCategoria.findByIdAndUpdate(id, { categoria_nombre : req.body.categoria_nombre},{new : true}, (err, docCategoria) =>{
        if( err || items)
        
        return errorHandler(items, next, err)
        
        return res.json({
            data : docCategoria
        })
    });
}

module.exports = {
    listar,
    getcategoria,
    guardar,
    borrar,
    actualizar
}
// Minuto 1:10 Clase 3.1