'use strict';

const mongoose = require('mongoose');
const Vendedor = mongoose.model('Funcionario');

exports.create = (body) => {
    var vendedor = new Vendedor(body);
    return vendedor.save();
};

exports.find = () => {
    return Vendedor.find({});
};

exports.findById = (id) => {
    return Vendedor.findById(id);
};

exports.findByCpf = (cpf) => {
    return Vendedor.findOne({ cpf });
};

exports.put = (id, body) => {
    return Vendedor.findByIdAndUpdate(id, {
        $set: {
            name: body.name,
            cpf: body.cpf,
            email: body.email
        }
    });
};

exports.delete = (id) => {
    return Vendedor.findByIdAndRemove(id);
};

exports.authenticate = async (data) => {

    console.log(data);
    
    var res = await Vendedor.findOne
        ({
            email: data.email,
            senha: data.senha
        });
    return res;    
};