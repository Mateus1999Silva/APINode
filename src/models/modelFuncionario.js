'use strict';

const mongoose = require('mongoose');
const extend = require('mongoose-schema-extend');
const Usuario = require('./modelCliente').schema;


var funcionarioSchema = Usuario.extend({
    cargo: {
        type: String,
        enum: ['Gerente', 'Vendedor', 'Subgerente'],
        required: true
    }
});

module.exports = mongoose.model('Funcionario', funcionarioSchema);