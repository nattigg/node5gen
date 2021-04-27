const ModelUsuario = require('../models/usuario_model');
const ModelProducto = require('../models/producto_model');

const addCarro = async (req, res, next) => {
    let productoId = req.body.productoId;
    let usuarioId = req.body.usuarioId;

    

    try {
        docProducto = await ModelProducto.findById(productoId).exec();
        console.log(docProducto);
        if (!docProducto){
            err = new Error('No Existe');
            err.statusCode = 404;
            throw (err);
        }

        docUsuario = await ModelUsuario.findById(usuarioId).exec();

        docUsuario = await docUsuario.addCarro(docProducto);

        res.json(docUsuario);
    } catch (error) {
        next(error);
    }

   // docUsuario = await
}

const listarCarro = async (req, res) =>{

    ModelUsuario.findById(req.params.id).
        populate('cart.items.productoId','-imagen').exec((err, items) =>{
        if(err){
            return res.json(err);
        }
        return res.json(items);
    })
}

const clearCarro = async (req, res) => {
    let docUsuario = await ModelUsuario.findById(req.params.id).exec();
    console.log(' 1 docUsuario', docUsuario);
    docUsuario = await docUsuario.clearCarro();
    console.log(' 2 docUsuario', docUsuario);
    return res.json(docUsuario);
}

const delItemCarro = async (req, res, next) =>{
    let productoId = req.body.productoId;
    let usuarioId = req.body.usuarioId;

    try {
        docProducto = await ModelProducto.findById(productoId).exec();
        console.log(docProducto);
        if (!docProducto){
            err = new Error('No Existe');
            err.statusCode = 404;
            throw (err);
        }

        docUsuario = await ModelUsuario.findById(usuarioId).exec();
        console.log("Lineas 64", docProducto);
        docUsuario = await docUsuario.delItemCarro(docProducto);

        res.json(docUsuario);
    } catch (error) {
        next(error);
    }
}
module.exports = {
    addCarro,
    listarCarro,
    clearCarro,
    delItemCarro
}