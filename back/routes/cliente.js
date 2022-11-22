'use strict'

var express = require('express');
var clienteController = require('../controllers/ClienteController');

var api = express.Router();
var auth = require('../middlewares/authenticate');

api.post('/registro_cliente', clienteController.registro_cliente);
api.post('/login_cliente', clienteController.login_cliente);

api.get('/listar_cliente_filtro_admin/:tipo/:filtro?', auth.auth, clienteController.listar_cliente_filtro_admin);
api.post('/registro_cliente_admin', auth.auth, clienteController.registro_cliente_admin);
api.get('/obtener_cliente_admin/:id', auth.auth, clienteController.obtener_cliente_admin);
api.put('/actualizar_cliente_admin/:id', auth.auth, clienteController.actualizar_cliente_admin);
api.delete('/eliminar_cliente_admin/:id', auth.auth, clienteController.eliminar_cliente_admin);
api.get('/obtener_cliente_guest/:id', auth.auth, clienteController.obtener_cliente_guest);
api.put('/actuaizar_perfil_cliente_guest/:id', auth.auth, clienteController.actuaizar_perfil_cliente_guest);

// DIRECCIONES

api.post('/registro_direccion_cliente', auth.auth, clienteController.registro_direccion_cliente);
api.get('/obtener_todas_direcciones_cliente/:id', auth.auth, clienteController.obtener_todas_direcciones_cliente);
api.put('/cambiar_direccion_principal/:id/:cliente', auth.auth, clienteController.cambiar_direccion_principal);
api.get('/obtener_direccion_principal/:id', auth.auth, clienteController.obtener_direccion_principal);

// CONTACTO
api.post('/enviar_mensaje_contacto', clienteController.enviar_mensaje_contacto);

// ORDENES
api.get('/obtener_ordenes_cliente/:id',auth.auth, clienteController.obtener_ordenes_cliente);

module.exports = api;