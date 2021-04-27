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
  },
  cart: {
    items: [{
      productoId: {
        type: Schema.Types.ObjectId,
        ref: 'modelProducto'
      },
      cantidad: {
        type: Number,
        required : true
      },
      total: {
        type: Number,
        required: true
      }
    }]
  }
});

//Add Carro
schemaUsuario.methods.addCarro = function(producto){

  let index = this.cart.items.findIndex( item => {
      return item.productoId.toString() == producto._id.toString()
  });

  console.log('indexi', index);

  let _cantidad = 1;
  let newCarroItems = [...this.cart.items];

  if(index >= 0){
    _cantidad = this.cart.items[index].cantidad + 1;
    newCarroItems[index].cantidad = _cantidad;
    newCarroItems[index].total = _cantidad * producto.precio;
  }else{
    newCarroItems.push(
      {
        productoId : producto._id,
        cantidad : _cantidad,
        total : producto.precio
      } 
      );
  }

  this.cart.items = newCarroItems;
  return this.save();
}

//Eliminar Item del Carro
schemaUsuario.methods.delItemCarro = function(producto){
  let index = this.cart.items.findIndex( item => {
    return item.productoId.toString() == producto._id.toString()
  });

  console.log('index reducir carrro', index);

  let _cantidad = 1;
  let newCarroItems = [...this.cart.items];

  if(newCarroItems[index].cantidad > 1){
    _cantidad = this.cart.items[index].cantidad - 1;
    newCarroItems[index].cantidad = _cantidad;
    newCarroItems[index].total = _cantidad * producto.precio;
  }
  else{
    delete newCarroItems[index];
     //this.cart.items = newCarroItems;
  }
  this.cart.items = newCarroItems;
  return this.save();

}

//Clear Carro
schemaUsuario.methods.clearCarro = function(docProducto){
  this.cart = { items : []}
  return this.save();
}
const model = mongoose.model('modelUsuario', schemaUsuario);
module.exports = model;