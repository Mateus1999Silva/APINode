'use strict';

const express = require('express');
const router = express.Router();
const controllerCliente = require('../controllers/controllerCliente');
const validationsCliente = require('../validators/validationsCliente');
const authService = require('../services/auth/authService');

router.post('/',authService.isAdmin,validationsCliente.myMiddleware, controllerCliente.post);
router.get('/clientes',authService.isAdmin, controllerCliente.find);
router.get('/:id', authService.isAdmin, controllerCliente.findById);
router.get('/dados/:cpf',authService.authorize, controllerCliente.findByCpf);
router.put('/:id',authService.isAdmin,validationsCliente.myMiddleware, controllerCliente.put);
router.delete('/:id',authService.isAdmin, controllerCliente.delete);
router.post('/authenticate', controllerCliente.authenticate);


module.exports = router;