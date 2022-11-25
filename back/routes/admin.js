'use strict'

var express = require('express');
var adminController = require('../controllers/AdminController');

var api = express.Router();
var auth = require('../middlewares/authenticate');

api.post('/registro_admin', adminController.registro_admin);
api.post('/login_admin', adminController.login_admin);
api.get('/obtener_mensajes_admin', auth.auth, adminController.obtener_mensajes_admin);
api.put('/cambiar_estado_mensaje/:id', auth.auth, adminController.cambiar_estado_mensaje);
api.get('/obtener_ventas_admin/:desde/:hasta?',auth.auth, adminController.obtener_ventas_admin);

module.exports = api;