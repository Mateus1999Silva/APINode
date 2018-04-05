'use strict';

const mongoose = require('mongoose');
const Venda = mongoose.model('Venda');

exports.create = (body) => {
    var venda = new Venda(body);
    return venda.save();
};

exports.findById = (id) => {
    return Venda.findById(id)
        .populate('items.item.carro')
        .populate('funcionario')
        .populate('cliente');
};

exports.delete = (id) => {
    return Venda.findByIdAndRemove(id);
};

exports.findByFuncionario = (id) => {
    return Venda.find({ 'funcionario': id });
};
