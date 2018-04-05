'use strict';

const repositorie = require('../repositories/repositorieVenda');

exports.post = (req, res, next) => {
    repositorie.create(req.body)
        .then(response => {
            return repositorie.findById(response.id);
        }).then(response => {
            res.status(201).send(response);
        }).catch(error => {        
            if (error.code === 11000) {
                res.status(400).send({ message: 'Dados ja cadastrados no sistema!' });
            } else if ('funcionario' in error.errors) {
                res.status(400).send({ message: 'Cliente Inválido'});
            } else if ('cliente' in error.errors) { 
                res.status(500).send({message:'Cliente Inválido'});
            }
        });
}

exports.findById = (req, res, next) => {
    repositorie.findById(req.params.id)
        .then(response => {
            res.status(200).send(response);
        }).catch(error => {
            res.status(400).send({ message: "Dado não encontrado" });
        });
};

exports.delete = (req, res, next) => {
    repositorie.delete(req.params.id).then(response => {
        res.status(200).send({ message: 'Venda excluida com sucesso' });
    }).catch(error => {
        res.status(400).send({ message: 'Erro ao deletar' });
    });
};

exports.findByFuncionario = (req, res, next) => {
    repositorie.findByFuncionario(req.params.id)
        .then(response => {
            res.status(200).send(response);
        }).catch(error => {
            res.status(400).send(error);
        });
};