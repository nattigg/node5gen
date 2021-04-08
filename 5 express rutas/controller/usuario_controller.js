const  express = require('express');

const app = express();

const data = [
    {
        id : 1233,
        user : "usuario1"
    },
    {
        id : 1234,
        user : "usuario2"
        
    }
]

// Listar
function listar(req, res) {
    res.json({
        data:data
    });
}

// get usuario 
function getusuario(req, res) {
    res.json({
        id : 1234,
        user : "usuario2"
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
    getusuario,
    guardar,
    borrar,
    actualizar
}