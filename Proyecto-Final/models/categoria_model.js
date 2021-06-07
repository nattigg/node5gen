const ModelFormulario = require('./formulario_model');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const validator_formulario = async (val)=> {
    console.log(val);
    let rpta = await ModelFormulario.exists({
        _id : val
    });
    return rpta;
}

var schemaCategoria = new mongoose.Schema({
    //campo 1 categoria nombre
     categoria_texto:{
         type: String
     },
     formulario: 
        { type: Schema.ObjectId, ref: "formulario" , required: true}
     
 },{
     timestamps : true
 });

 schemaCategoria.path('formulario').validate({
     validator : validator_formulario,
     message : 'Formulario no existe'
 });
 
 const model = mongoose.model('ModelCategoria', schemaCategoria);
 
 module.exports = model;