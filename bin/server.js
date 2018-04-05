'use strict';

const http = require('http');
const app = require('../src/app');

const port = normalizePort(process.env.port || '3000');
app.set('port', port);

const server = http.createServer(app);
server.listen(port);
server.on('error', onError);

function onError(error) {
    if (error.syscall != 'listen') {
        throw error;
    }

    const bind = typeof port === 'string' ?
        'Piepe' + port :
        'Port' + port;

    switch (error.code) {
        case 'EACCES':
            console.error(bind + 'Mateu' + 'requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + 'is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
};

function normalizePort(val) {
    const port = parseInt(val, 10);

    if (isNaN(port)) {
        return val;
    }

    if (port >= 0) {
        return port;
    }

    return false;
};