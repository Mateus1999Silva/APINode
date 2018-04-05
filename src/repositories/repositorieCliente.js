'use strict';

const mongoose = require('mongoose');
const Usuario = mongoose.model('Cliente');

exports.create = (body) => {
    var usuario = new Usuario(body);
    return usuario.save();
};

exports.find = () => {
    return Usuario.find({});
};

exports.findById = (id) => {
    return Usuario.findById(id);
};

exports.findByCpf = (cpf) => {
    return Usuario.findOne({ cpf });
};

exports.put = (id, body) => {
    return Usuario.findByIdAndUpdate(id, {
        $set: {
            name: body.name,
            cpf: body.cpf,
            email: body.email
        }
    });
};

exports.delete = (id) => {
    return Usuario.findByIdAndRemove(id);
}

exports.authenticate = async (body) => {
    var res = await Usuario.findOne
        ({
            email: body.email,
            senha: body.senha
        })
    return res;
}