'use strict';

const validator = require('validator');
const repositorieCarro = require('../repositories/repositorieCarro');

exports.myMiddleware = [(req, res, next) => {
    if (!validator.isLength(req.body.name, { min: 1 })) {
        res.status(400).send({ message: 'Nome Inválido' });
    } else {
        next();
    };
}, (req, res, next) => {
    if (!validator.isLength(req.body.marca, { min: 1 })) {
        res.status(400).send({ message: 'Marca Inválido' });
    } else {
        next();
    };
}, (req, res, next) => {    
    if (req.body.cor === null || req.body.cor == 0 || req.body.cor == undefined) {
        res.status(400).send({ message: 'Cores Inválidas' });
    } else {
        next();
    };
}, (req, res, next) => {
    if (!validator.isNumeric(req.body.price.toString())) {
        res.status(400).send({ message: 'Preço Inválido' });
    } else {
        next();
    };
}];






