const  express = require('express');
const mongoose = require('mongoose');
const fileUpload = require('express-fileupload');

const routerV1 = require('./routers/v1/index');
//const routerV2 = require('./routers/v2/index');

const app = express();

//middleware que nos ayuda a reconocer el ingreso de un json
//req.body.nombreVariables
app.use(express.json());

//req.file.nombreimagen
app.use(fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 },
  }));

app.use( (req, res, next) => {
    console.log("Retorno ");
    next();
});

//api/v1/categoria
routerV1(app);
//api/v2/categoria
//routerV2(app);

//Error Hangler
app.use(function(err, req, res, next){

    console.error(err);

    const status = err.statusCode || 500 ;
    const message= err.message;
    const data = err.data;

    res.status(status).json({
        message : message,
        data : data
    });

    //console.error(err.stack);
    //res.status(500).send("error 500");
});

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