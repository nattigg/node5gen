const  express = require('express');
const mongoose = require('mongoose');
const routerV1 = require('./routers/index');
const app = express();

routerV1(app);

mongoose.connect('mongodb://localhost/node5gen',{
    useNewUrlParser : true,
    useUnifiedTopology : true,
    useFindAndModify : false,
    useCreateIndex: true
}).then( () =>{
    console.log('Mongo ok');
});


app.listen(8080, ()=>{
    console.log("servidor ok 8080");
});