var mongoose = require('mongoose');

var Categoria = new mongoose.Schema({
   //campo 1 categoria nombre
    categoria_nombre:{
        type: String,
        required : true,
        unique : true
    }
},{
    timestamps : true
});

const model = mongoose.model('ModelCategoria', Categoria);

module.exports = model;


//Schema  ->  Modelo -> Documento
