'use strict';

const validator = require('validator');
const repositorie = require('../repositories/repositorieCarro');
const async = require('async');
const upperCase = require('upper-case');

exports.myMiddleware = [(req, res, next) => {
    async.each(req.body.item, function (carro, callback) {
        repositorie.getById(carro.carro)
            .then(response => {
                if (!response.cor.includes(upperCase(carro.cor))) {
                    callback('corInvalida');
                } else if (!validator.isNumeric(carro.quantidade.toString())) {
                    callback('qtInvalida');
                } else {
                    callback();
                }
            }).catch(error => {
               res.status(404).send({message:'Carro Inválido'});
            });
    }, function (err) {
        if (err) {
            if (err.includes('corInvalida')) {
                res.status(400).send({ message: 'Cor não disponivel!' });
            } else if (err.includes('qtInvalida')) {
                res.status(400).send({ message: 'Quantidade Inválida!' })
            } else {
                throw err;
            }
        } else {
            next();
        }
    });
}, (req, res, next) => {
    if (validator.isEmpty(req.body.formaPagamento)) {
        res.status(400).send({ message: 'Forma de Pagamento Invalidá' });
    } else {
        next();
    }
}];






