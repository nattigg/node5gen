const ModelPregunta = require('./pregunta_model');
const ModelUsuario = require('./usuario_model');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const validator_pregunta = async (val)=> {
    console.log(val);
    let rpta = await ModelPregunta.exists({
        _id : val
    });
    return rpta;
}

const validator_usuario = async (val)=> {
    console.log(val);
    let rpta = await ModelUsuario.exists({
        _id : val
    });
    return rpta;
}

var schemaRespuesta = new mongoose.Schema({
     respuesta_texto:{
         type: String
     },
     usuario :  { type: Schema.ObjectId, ref: "usuario" , required: true},
     pregunta:  { type: Schema.ObjectId, ref: "pregunta" , required: true},
     estado : {
        type: Boolean, 
        default: true
    }
 },{
     timestamps : true
 });
 
 schemaRespuesta.path('pregunta').validate({
    validator : validator_pregunta,
    message : 'Pregunta no existe'
});

schemaRespuesta.path('usuario').validate({
    validator : validator_usuario,
    message : 'Usuario no existe'
});
 const model = mongoose.model('ModelRespuesta', schemaRespuesta);
 
 module.exports = model;