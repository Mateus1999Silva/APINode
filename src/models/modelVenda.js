'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({

        item: [{
            carro: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Carro'
            },
            quantidade: {
                type: Number,
                required: true,
                default: 1
            },
            cor: {
                type: String,
                required: true,
                default: 'Branco'
            }
        }],
    funcionario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Funcionario'
    },
    cliente: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cliente'
    },
    formaPagamento: {
        type: String,
        required: true
    },
    dataVenda: {
        type: Date,
        required: true,
        default: Date.now
    }
});

module.exports = mongoose.model('Venda', schema);