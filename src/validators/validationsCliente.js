'use strict';

const CPF = require('cpf_cnpj').CPF;
const regexEmail = require('regex-email');
const validator = require('validator');
const passwordValidator = require('password-validator');


exports.myMiddleware = [(req, res, next) => {
    if (!validator.isLength(req.body.name, { min: 3, max: 100 })) {
        res.status(400).send({ message: 'Nome Inválido' });
    } else {
        next();
    };
}, (req, res, next) => {
    if (!CPF.isValid(req.body.cpf)) {
        res.status(400).send({ message: 'CPF Inválido!' });
        return;
    } else {
        next();
    }
}, (req, res, next) => {
    if (!regexEmail.test(req.body.email)) {
        res.status(400).send({ message: 'Email Inválido!' });
        return;
    } else {
        next();
    }
}, (req, res, next) => {
    var password = new passwordValidator();
    password.is().min(8)
        .is().max(15)
        .has().uppercase()
        .has().lowercase()
        .has().digits()
        .has().not().spaces()
        .is().not().oneOf(['Passw0rd', 'Password123']);

    if (!password.validate(req.body.senha)) {
        res.status(400).send({ message: 'Senha Inválida!' });
        return;
    } else {
        next();
    }
}];






