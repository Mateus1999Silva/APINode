'use strict';

const repositorie = require('../repositories/repositorieCliente');
const md5 = require('md5');
const config = require('../services/auth/authService');

exports.post = (req, res, next) => {
    repositorie.create({
        name: req.body.name,
        cpf: req.body.cpf,
        email: req.body.email,
        senha: md5(req.body.senha),
        tipo: req.body.tipo
    }).then(response => {
        res.status(201).send(response);
    }).catch(error => {
        if (error.code === 11000) {
            res.status(400).send({ message: 'Dados ja cadastrados no sistema!' });
        } else {
            res.status(400).send({ message: 'Informações Preenchidas incorretamente!', error });
        }
    });
};

exports.find = (req, res, next) => {
    repositorie.find()
        .then(response => {
            res.status(200).send(response);
        }).catch(error => {
            res.status(400).send('Erro ao buscar Usuarios!');
        });
};

exports.findById = (req, res, next) => {
    repositorie.findById(req.params.id)
        .then(response => {
            res.status(200).send(response);
        }).catch(error => {
            res.status(400).send("Usuario não encontrado!");
        });
};

exports.findByCpf = (req, res, next) => {
    repositorie.findByCpf(req.params.cpf)
        .then(response => {
            res.status(200).send(response);
        }).catch(error => {
            res.status(400).send('Usuario não encontrado!');
        });
};

exports.put = (req, res, next) => {
    repositorie.put(req.params.id, req.body)
        .then(response => {
            return repositorie.findById(response._id);
        }).then(response => {
            res.status(200).send(response);
        }).catch(error => {
            res.status(400).send({ message: 'Usuario não encontrado!' });
        });
};

exports.delete = (req, res, next) => {
    repositorie.delete(req.params.id).then(response => {
        res.status(200).send({ message: 'Usuário deletado com sucesso!' });
    }).catch(error => {
        res.status(400).send({ message: 'Erro ao deletar Usuario' });
    });
};

exports.authenticate = async (req, res, next) => {
    try {
        var cliente = await repositorie.authenticate
            ({
                senha: md5(req.body.senha),
                email: req.body.email
            });


        if (!cliente) {
            res.status(400).send({ message: 'Dados Inválidos' });
        }

        var token = await config.generateToken
            ({
                name: cliente.name,
                email: cliente.email,
                senha: cliente.senha,
                id: cliente.id
            });

        res.status(200).send({
            token: token,
            data: {
                name: cliente.name,
                email: cliente.email,
                senha: cliente.senha,
                id: cliente.id
            }
        });
    } catch (error) {
        res.status(400).json('Erro');
    }

}