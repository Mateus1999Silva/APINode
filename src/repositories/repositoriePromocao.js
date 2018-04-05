'use strict';

const con = require('../services/dbMysql/promocao');

exports.create = (body) => {
    return new Promise((res, rej) => {
        con.query('INSERT INTO promocao (descricao, nomeCarro) values(?,?)', [body.descricao, body.nomeCarro],
            function (err, result) {
                if (err) rej(err);
                res(result);
            });
    });
};

exports.find = () => {
    return new Promise((res, rej) => {
        con.query('SELECT * FROM promocao',
            function (err, result) {
                if (err) rej(err);
                res(result);
            });
    });
};

exports.delete = (id) => {
    return new Promise((res, rej) => {
        con.query('DELETE FROM promocao where id = ?', (id),
            function (err, result) {
                if (err) rej(err);
                res(result);
            });
    });
};

exports.put = (id, body) => {
    return new Promise((res, rej) => {
        con.query('UPDATE promocao set descricao =?, nomeCarro =? WHERE id = ?', [body.descricao, body.nomeCarro, id],
            function (err, result) {
                if (err) rej(err);
                res(result);
            });
    });
};

exports.findById = (id) => {
    return new Promise((res, rej) => {
        con.query('SELECT * FROM promocao  where id =?', (id),
            function (err, result) {
                if (err) rej(err);
                res(result);
            });
    });
};