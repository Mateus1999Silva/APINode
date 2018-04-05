'use strict';

const repositorie = require('../repositories/repositorieCarro');
const upperCase = require('upper-case');

exports.post = (req, res, next) => {
    repositorie.create
        ({
            name: req.body.name,
            model:req.body.model,
            marca:req.body.marca,
            cor:upperCase(req.body.cor),
            price:req.body.price
        })
        .then(response => {
            res.status(201).send(response);
        }).catch(error => {
            res.status(400).send(error);
        });
};

exports.get = (req, res, next) => {
    repositorie.get()
        .then(response => {
            res.status(200).send(response);
        }).catch(error => {
            res.status(404).send({ message: 'Dados não encontrados!' });
        });
};

exports.getById = (req, res, next) => {
    repositorie.getById(req.params.id)
        .then(response => {
            res.status(200).send(response);
        }).catch(error => {
            res.status(404).send({ message: "Dado não encontrado!" });
        });
};

exports.put = (req, res, next) => {
    repositorie.put(req.params.id, req.body)
        .then(response => {
            return repositorie.getById(response._id);
        }).then(response => {
            res.status(200).send(response);
        }).catch(error => {
            throw error;
            res.status(404).send('Dado não encontrado');
        });
};

exports.delete = (req, res, next) => {
    repositorie.delete(req.params.id)
        .then(response => {
            res.status(200).send({ message: 'Carro deletado com sucesso!' });
        }).catch(error => {
            res.satus(400).send({ message: 'Erro ao deletar!' });
        });
};
