'use strict';

const mysql = require("mysql");

const host = process.env.DB_HOST || "*******";
const user = process.env.DB_USER || "*******";
const pass = process.env.DB_PASS || "*******";
const name = process.env.DB_NAME || "*******";
const port = 41890;

const db = {};

db.query = function(sql, sql_dados, done) {
  const conexao = mysql.createConnection({
    host: host,
    port: port,
    user: user,
    password: pass,
    database: name,
    debug: false,
    multipleStatements: true
  });

  conexao.connect(function(err) {
    if (err) return done(err.sqlMessage);

    conexao.query(sql, sql_dados, function(error, results, fields) {
      //console.log("db.query sql:", sql);
      conexao.end();
      if (error) {
        //console.log("db.query erro:", error);
        done(error);
      } else {
        //console.log("db.query results:", results);
        done(null, results);
      }
    });
  });
};

module.exports = db;


//Conexao Local
/*const mysql = require('mysql');

//MYSQL
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    port: 3306,
    password: 'root',
    database: 'apiNodejs'
});

connection.connect(err => {
    if (err) throw err;
    console.log('Servidor Rodando');
})

module.exports = connection;*/
