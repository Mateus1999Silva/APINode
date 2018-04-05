'use strict';

const repositorie = require('../repositories/repositorieFuncionario');
const md5 = require('md5');
const config = require('../services/auth/authService');

exports.post = (req, res, next) => {
    repositorie.create({
        name: req.body.name,
        cpf: req.body.cpf,
        senha: md5(req.body.senha),
        tipo: req.body.tipo,
        email: req.body.email,
        numero: req.body.numero,
        cargo: req.body.cargo
    }).then(response => {
        res.status(201).send(response);
    }).catch(error => {
        if (error.code === 11000) {
            res.status(400).send({ message: 'Dados duplicados!' });
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
            res.status(400).send('Erro ao buscar Vendedores!');
        });
};

exports.findById = (req, res, next) => {
    repositorie.findById(req.params.id)
        .then(response => {
            res.status(200).send(response);
        }).catch(error => {
            res.status(400).send("Vendedor não encontrado!");
        });
};

exports.findByCpf = (req, res, next) => {
    repositorie.findByCpf(req.params.cpf)
        .then(response => {
            res.status(200).send(response);
        }).catch(error => {
            res.status(400).send('Vendedor não encontrado!');
        });
};

exports.put = (req, res, next) => {
    repositorie.put(req.params.id, req.body)
        .then(response => {
            return repositorie.findById(response._id);
        }).then(response => {
            res.status(200).send(response);
        }).catch(error => {
            res.status(400).send({ message: 'Vendedor não encontrado!' });
        });
};

exports.delete = (req, res, next) => {
    repositorie.delete(req.params.id).then(response => {
        res.status(200).send({ message: 'Vendedor deletado com sucesso!' });
    }).catch(error => {
        res.status(400).send({ message: 'Erro ao deletar Vendedor' });
    });
};

exports.authenticate = async (req, res, next) => {
    try {
        var funcionario = await repositorie.authenticate
            ({
                senha: md5(req.body.senha),
                email: req.body.email
            });

        if (!funcionario) {
            res.status(401).send({ message: 'Dados Inválidos' });
            return;
        }

        const token = await config.generateToken({
            email: funcionario.email,
            senha: funcionario.senha,
            id: funcionario._id,
            name:funcionario.name,
            cargo:funcionario.cargo
        });

        res.status(201).send({
            token: token,
            data: {
                email: funcionario.email,
                name: funcionario.name,
                senha:funcionario.senha,
                id:funcionario.id,
                cargo:funcionario.cargo
            }
        });

    } catch (error) {
        res.status(400).send({ message: "Erro" });
    }

};