'use strict'

var Admin = require('../models/admin');
var bcrypt = require('bcrypt-nodejs');

const registro_admin = async function(req, res) {

    var data = req.body;
    var admin_arr = [];

    admin_arr = await Admin.find({ email: data.email });

    //Validar que el correo ya existe en bd
    if (admin_arr.length == 0) {


        if (data.password) {
            bcrypt.hash(data.password, null, null, async function(err, hash) {
                if (hash) {
                    data.password = hash;
                    var reg = await Admin.create(data);
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

module.exports = {
    registro_admin
}