'use strict';

const cliente = require('./validationsCliente');


exports.validations = [cliente.myMiddleware,
(req, res, next) => {
   //Validacoes alem da middleware validation
   next();

}];


