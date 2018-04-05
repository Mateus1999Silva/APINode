'use strict';

const express = require('express');
const router = express.Router();
const controllerFuncionario = require('../controllers/controllerFuncionario');
const validationFuncionario = require('../validators/validationsFuncionario');
const authService = require('../services/auth/authService');

router.post('/',authService.isAdmin,validationFuncionario.validations,controllerFuncionario.post);
router.get('/funcionarios',authService.isAdmin, controllerFuncionario.find);
router.get('/dados/:id', authService.isAdmin, controllerFuncionario.findById);
router.get('/dados/:cpf',authService.isAdmin, controllerFuncionario.findByCpf);
router.put('/:id',authService.isAdmin,validationFuncionario.validations, controllerFuncionario.put);
router.delete('/:id', authService.isAdmin, controllerFuncionario.delete);
router.post('/authenticate', controllerFuncionario.authenticate);


module.exports = router;