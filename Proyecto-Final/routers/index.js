const respuestaRouter = require('./respuesta_router');
const preguntaRouter = require('./pregunta_router');
const formularioRouter = require('./formulario_router');
const categoriaRouter = require('./categoria_router');
const loginRouter = require('./login_router');

module.exports = (app) => {
    app.use('/api', respuestaRouter);
    app.use('/api', preguntaRouter);
    app.use('/api', formularioRouter);
    app.use('/api', categoriaRouter);
    app.use('/api', loginRouter);
}