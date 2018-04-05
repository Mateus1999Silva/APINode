'use strict';

const express = require('express');
const router = express.Router();
const controllerCarro = require('../controllers/controllerCarro');
const validations = require('../validators/validationsCarro');
const authService = require('../services/auth/authService');

router.post('/',authService.isAdmin, validations.myMiddleware, controllerCarro.post);
router.get('/carros',authService.authorize, controllerCarro.get);
router.get('/dados/:id', authService.isAdmin,controllerCarro.getById);
router.put('/:id',authService.isAdmin,validations.myMiddleware, controllerCarro.put);
router.delete('/:id',authService.isAdmin, controllerCarro.delete);

module.exports = router;