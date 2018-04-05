'use strict';

const mongoose = require('mongoose');
const Car = mongoose.model('Carro');

exports.create = (body) => {
    var car = new Car(body);
    return car.save();
};

exports.get = () => {
    return Car.find({});
};

exports.getById = (id) => {
    return Car.findById(id);
};

exports.put = (id, body) => {
    return Car.findByIdAndUpdate(id, {
        $set: {
            name: body.name,
            model: body.model,
            marca: body.marca,
            cor: body.cor,
            price: body.price
        }
    })
};

exports.find = () => {
    return Car.find({});
};

exports.delete = (id) => {
    return Car.findByIdAndRemove(id);
};
