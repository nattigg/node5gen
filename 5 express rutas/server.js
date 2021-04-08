const  express = require('express');
const routerV1 = require('./routers/index');
const app = express();

routerV1(app);

app.listen(8080, ()=>{
    console.log("servidor ok 8080");
});