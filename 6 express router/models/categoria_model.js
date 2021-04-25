var mongoose = require('mongoose');

var schemaCategoria = new mongoose.Schema({
   //campo 1 categoria nombre
    categoria_nombre:{
        type: String,
        required : true,
        unique : true
    }
},{
    timestamps : true
});

const model = mongoose.model('ModelCategoria', schemaCategoria);

module.exports = model;


//Schema  ->  Modelo -> Documento
