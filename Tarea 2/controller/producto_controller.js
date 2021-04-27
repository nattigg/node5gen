const ModelProducto = require('../models/producto_model');

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
function listar(req, res, next) {
    ModelProducto.find()
    .select('-imagen')
    .exec( (err, items) =>{
        if( err || !items)
            return errorHandler(items, next, err)

        return res.json({
            items : items
        })
    });
}

//Params
function productoById (req, res, next, id){
    console.log("Metodo Params");
    let myQuery = ModelProducto.findById(id);

    myQuery
    .select('-imagen')
    .exec((err, docProducto) => {
        if( err || !docProducto)
                return errorHandler(docProducto, next, err)
        
        req.docProducto = docProducto;
        next();
    })
}

// get producto 
function getproducto(req, res) {
    return res.json({
        data : req.docProducto
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
        modelProducto.imagen.data = req.files.imagen.data;
        modelProducto.imagen.contentType = req.files.imagen.minetype;
    } 
   modelProducto.save((err, docProducto)=>{
       
        if( err || !docProducto) {
            
            return errorHandler(docProducto, next, err)
        }

        docProducto = docProducto.toObject();
        //borrar imagen para que no vaya en la respuesta
        delete docProducto.imagen;

        return res.json({
            data:docProducto
        })
   })
}

//Borrar
function borrar(req, res) {
    
    req.docProducto.disponible = false;
    req.docProducto.save((err, item) => {
        if( err || !item) {
            
            return errorHandler(item, next, err)
        }

        return res.json({
            data:item
        })
    });

}

//Actualizar
function actualizar(req, res, next){
    let id = req.params.id;
    console.log("entramos");
    console.log(id);
    ModelProducto.findByIdAndUpdate(id, 
        req.body, { new : true }, (err, docProducto) => {
        if( err || !docProducto) {
            
            return errorHandler(docProducto, next, err)
        }

        return res.json({
            data:docProducto
        })
    })
}

module.exports = {
    productoById,
    listar,
    getproducto,
    guardar,
    borrar,
    actualizar
}
//1:15 3_1