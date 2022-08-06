'use strict'

var Cliente = require('../models/cliente');
var bcrypt = require('bcrypt-nodejs');
var jwt = require('../helpers/jwt');
const { request } = require('express');

const registro_cliente = async function(req, res) {

    var data = req.body;
    var clientes_arr = [];

    clientes_arr = await Cliente.find({ email: data.email });

    //Validar que el correo ya existe en bd
    if (clientes_arr.length == 0) {


        if (data.password) {
            bcrypt.hash(data.password, null, null, async function(err, hash) {
                if (hash) {
                    data.password = hash;
                    var reg = await Cliente.create(data);
                    res.status(200).send({ data: reg });
                } else {
                    res.status(200).send({ message: 'ErrorServerHash', data: undefined });
                }
            })
        } else {
            res.status(200).send({ message: 'No hay una contraseña', data: undefined });
        }

    } else {
        res.status(200).send({ message: 'El Correo ya existe en la base de datos', data: undefined });
    }


}

const login_cliente = async function(req, res) {
    var data = req.body;
    var cliente_arr = [];

    cliente_arr = await Cliente.find({ email: data.email });

    if (cliente_arr.length == 0) {
        res.status(200).send({ message: 'No se encontro el correo', data: undefined });
    } else {
        //LOGIN
        let user = cliente_arr[0];

        bcrypt.compare(data.password, user.password, async function(error, check) {
            if (check) {
                res.status(200).send({
                    data: user,
                    token: jwt.createToken(user)
                });
            } else {
                res.status(200).send({ message: 'La contraseña no coincide', data: undefined });
            }
        });
    }
}

const listar_cliente_filtro_admin = async function(req, res) {
    //Verificar que tiene los permisos suficientes
    if (req.user) {
        if (req.user.role == 'admin') {
            let tipo = req.params['tipo'];
            let filtro = req.params['filtro'];;

            if (tipo == null | tipo == 'null') {
                let reg = await Cliente.find();
                res.status(200).send({ data: reg });
            } else {
                if (tipo == 'apellidos') {
                    let reg = await Cliente.find({ apellidos: new RegExp(filtro, 'i') });
                    res.status(200).send({ data: reg });
                } else if (tipo == 'email') {
                    let reg = await Cliente.find({ email: new RegExp(filtro, 'i') });
                    res.status(200).send({ data: reg });
                }
            }
        } else {
            res.status(500).send({ message: 'NoAccess' });
        }
    } else {
        res.status(500).send({ message: 'NoAccess' });
    }


}

const registro_cliente_admin = async function(req, res) {
    if (req.user) {
        if (req.user.role == 'admin') {
            var data = req.body;

            //Contraseña por defecto
            bcrypt.hash('123456', null, null, async function(err, hash) {
                if (hash) {
                    data.password = hash;
                    let reg = await Cliente.create(data);
                    res.status(200).send({ data: reg });
                } else {
                    res.status(200).send({ message: 'Hubo un error en el servidor', data: undefined });
                }
            })


        }
    }
}

module.exports = {
    registro_cliente,
    login_cliente,
    listar_cliente_filtro_admin,
    registro_cliente_admin
}