'use strict';

const express = require('express');
const router = express.Router();
const app = express();
const mongoose = require('mongoose')
const bodyParse = require('body-parser');
const config = require('./services/dbMongo/config');


//BD
mongoose.connect(config.connectionString);

app.use(bodyParse.json({

}));
app.use(bodyParse.urlencoded({
    extended: false
}));

//Controllers
const Carro = require('./models/modelCarro');
const Cliente = require('./models/modelCliente').model;
const Funcionario = require('./models/modelFuncionario');
const Venda = require('./models/modelVenda');

//carrega as Rotas
const routerCarro = require('./routers/routerCarro');
const routerCliente = require('./routers/routerCliente');
const routerFuncionario = require('./routers/routerFuncionario');
const routerVenda = require('./routers/routerVenda');
const routerPromocao = require('./routers/routerPromocao');

app.use('/carro', routerCarro);
app.use('/cliente', routerCliente);
app.use('/funcionario', routerFuncionario);
app.use('/venda', routerVenda);
app.use('/promocao', routerPromocao);


module.exports = app;

