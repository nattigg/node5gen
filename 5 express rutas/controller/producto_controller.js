const  express = require('express');

const app = express();

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
function guardar(req, res){
    res.json({
        message : "Guardado"
    });
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