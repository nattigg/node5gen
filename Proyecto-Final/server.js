const  express = require('express');
const mongoose = require('mongoose');


const app = express();
const routerV1 = require('./routers/index');
app.use(express.json());

//set NODE_ENV=desarrollo -> CREAMOS VARIABLE DE ENTORNO DONDE IDENTIFICAMOS QUE ESTAMOS EN DESARROLLO
// se debe crear la variable de entorno
// set NODE_ENV = desarrollo
// desde CMD

console.log(`-${process.env.NODE_ENV}-`);

if (process.env.NODE_ENV === 'desarrollo'){
    require('dotenv').config({path: `${__dirname}/.env.desarrollo`});
}else if (process.env.NODE_ENV === 'produccion'){
    require('dotenv').config();
}

app.use(cors());

/*
app.use((req, res, next) =>{
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    next();
});
*/

routerV1(app);

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


//process.env.MONGO_URL
mongoose.connect(process.env.MONGO_URL,{    
    useNewUrlParser : true,
    useUnifiedTopology : true,
    useFindAndModify : false,
    useCreateIndex: true
}).then( () =>{
    console.log('Mongo ok');
});

//process.env.PORT
app.listen(process.env.PORT, ()=>{
    console.log("servidor ok 8080");
});