'use strict';

const express = require('express');
const router = express.Router();
const controllerVenda = require('../controllers/controllerVenda');
const validationsVenda = require('../validators/validationsVenda');
const authService = require('../services/auth/authService');

router.post('/',authService.isAdmin,validationsVenda.myMiddleware, controllerVenda.post);
router.get('/dados/:id',authService.isAdmin, controllerVenda.findById);
router.delete('/:id',authService.isAdmin, controllerVenda.delete);
router.get('/:id',authService.isAdmin, controllerVenda.findByFuncionario);


module.exports = router;