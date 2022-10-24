'use strict'

var express = require('express');
var ventaController = require('../controllers/VentaController');

var api = express.Router();
var auth = require('../middlewares/authenticate');

api.post('/registro_compra_cliente', auth.auth, ventaController.registro_compra_cliente);
api.get('/enviar_correo_envio_compra/:id', auth.auth, ventaController.enviar_correo_envio_compra);

module.exports = api;