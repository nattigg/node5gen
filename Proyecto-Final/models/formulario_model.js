var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var schemaFormulario = new mongoose.Schema({
   //campo 1 categoria nombre
    formulario_nombre:{
        type: String,
        unique : true
    },
    categorias: [{
        categoria: { type: Schema.ObjectId, ref: "categoria" }
    }]
},{
    timestamps : true
});

const model = mongoose.model('ModelFormulario', schemaFormulario);

module.exports = model;