const ModelProducto = require('../models/producto_model');

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

const data = [
    {
        id : 1233,
        categoria : "Polos",
        producto : "Polo 1"
    },
    {
        id : 1234,
        categoria : "Polos",
        producto : "Polo 2"
    },
    {
        id : 1235,
        categoria : "Pantalones",
        producto : "Pantalon 1"
    },
    {
        id : 1236,
        categoria : "Pantalones",
        producto : "Pantalon 2"
    }
]

// Listar
function listar(req, res) {
    res.json({
        data:data
    });
}

// get producto 
function getproducto(req, res) {
    res.json({
        id : 1236,
        categoria : "Pantalones",
        producto : "Pantalon 2"
    });
}

//Guardar
function guardar(req, res, next){
    
   let data = { 
       producto_nombre : req.body.producto_nombre,
       descripcion  : req.body.descripcion,
       precio : req.body.precio,
       stock : req.body.stock,
       vendidos : req.body.vendidos,
       disponible : req.body.disponible,
       categoria_nombre : req.body.categoria_nombre
   }
   
   let modelProducto = new ModelProducto(data);
   
   if(req.files){
       //console.log(req.files);
        //modelProducto.imagen.data = req.files.imagen.data;
        //modelProducto.imagen.contentType = req.files.imagen.minetype;
    } 
   modelProducto.save((err, docProducto)=>{
       
        if( err || !docProducto) {
            
            return errorHandler(docProducto, next, err)
        }

        //docProducto = docProducto.toObject();
        //borrar imagen para que no vaya en la respuesta
        //delete docProducto.imagen;

        return res.json({
           // data:docProducto
        })
   })
}

//Borrar
function borrar(req, res) {
    res.json({
        message : "Borrado"
    });
}

//Actualizar
function actualizar(req, res){
    res.json({
        message : "Actualizado"
    });
}

module.exports = {
    listar,
    getproducto,
    guardar,
    borrar,
    actualizar
}
//1:15 3_1