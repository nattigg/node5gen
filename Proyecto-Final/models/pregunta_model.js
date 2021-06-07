const ModelCategoria = require('./categoria_model');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const validator_categoria = async (val)=> {
    console.log(val);
    let rpta = await ModelCategoria.exists({
        _id : val
    });
    return rpta;
}


var schemaPregunta = new mongoose.Schema({
    //campo 1 categoria nombre
     pregunta_texto:{
         type: String
     },
     categoria: { type: Schema.ObjectId, ref: "categoria" , required: true}
     
 },{
     timestamps : true
 });
 
 schemaPregunta.path('categoria').validate({
    validator : validator_categoria,
    message : 'Categoria no existe'
});

 const model = mongoose.model('ModelPregunta', schemaPregunta);
 
 module.exports = model;