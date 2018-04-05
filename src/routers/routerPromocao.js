'use strict';

const express = require('express');
const router = express.Router();
const controllerPromocao = require('../controllers/controllerPromocao');
const authService = require('../services/auth/authService');

router.post('/',authService.isAdmin, controllerPromocao.create);
router.get('/promocoes', authService.authorize,controllerPromocao.find);
router.get('/dados/:id',authService.isAdmin, controllerPromocao.findById);
router.delete('/:id',authService.isAdmin, controllerPromocao.delete);
router.put('/:id',authService.isAdmin, controllerPromocao.put);


module.exports = router;