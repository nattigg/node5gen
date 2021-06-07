var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var schemaUsuario = new Schema({
  nombre: {
    type: String
  },
  email: {
    type: String,
    unique: true
  },
  password: {
    type: String
  },
  role: {
    type: String,
    default: 'USER_ROLE'
  },
  disponible: {
    type: Boolean,
    default: true
  }
});

const model = mongoose.model('modelUsuario', schemaUsuario);
module.exports = model;

