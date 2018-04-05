'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    name: {
        type: String,
        required: [true, 'O Nome é Obrigatorio!'],
        trim: true
    },
    model: {
        type: String,
        required: [true, 'O Modelo é Obrigatorio!'],
        enum: ['Hatch', 'Sedan'],
        default: 'hatch'
    },
    marca: {
        type: String,
        required: [true, 'A Marca é Obrigatória!'],
        trim: true
    },
    cor: [{
        type: String,
        required: true
    }],
    price: {
        type: Number,
        required: [true, 'O Preço é Obrigatório!']
    }
});

module.exports = mongoose.model('Carro', schema);