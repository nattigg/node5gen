
const data = [
    {
        id : 123,
        nombre : "Polos"
    },
    {
        id : 1234,
        nombre : "Pantalones"
    }
]

// Listar
function listar(req, res) {
    res.json({
        data:data
    });
}

// get categoria 
function getcategoria(req, res) {
    res.json({
        id : 1234,
        nombre : "Pantalones"
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
    getcategoria,
    guardar,
    borrar,
    actualizar
}