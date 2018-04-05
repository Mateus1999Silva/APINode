'use strict';

const repositorie = require('../repositories/repositoriePromocao');

exports.create = (req, res, next) => {
    repositorie.create(req.body)
        .then(response => {
            res.status(201).send({ message: 'Dados inseridos com sucesso!' });
        }).catch(error => {
            res.status(400).send({ message: 'Falha' });
        });
};

exports.find = (req, res, next) => {
    repositorie.find()
        .then(response => {
            res.status(200).send(response);
        }).catch(error => {
            res.status(400).send({ message: 'Erro ao buscar dados' });
        });
};

exports.delete = (req, res, next) => {
    repositorie.delete(req.params.id)
        .then(response => {
            res.status(200).send({ message: 'Promocao excluida com sucesso' });
        }).catch(error => {
            res.status(400).send({ message: 'Erro ao excluir!' });
        });
};

exports.put = (req, res, next) => {
    repositorie.put(req.params.id, req.body)
        .then(response => {
            return repositorie.findById(req.params.id);
        }).then(response => {
            res.status(200).send(response[0]);
        }).catch(error => {
            res.status(400).send({ message: 'Erro ao atualizar Dados' });
        });
};

exports.findById = (req, res, next) => {
    repositorie.findById(req.params.id)
        .then(response => {
            res.status(200).send(response[0]);
        }).catch(error => {
            res.status(400).send({ message: 'Erro ao buscar promoção!' });
        });
};