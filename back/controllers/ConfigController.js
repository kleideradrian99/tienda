'use strict'

var Config = require('../models/config');
var fs = require('fs');
var path= require('path');

const actualizar_config_admin = async function (req, res) {
    if (req.user) {
        if (req.user.role = "admin") {

            let data = req.body;
            if (req.files) {
                //Si hay una imagen
                var img_path = req.files.logo.path;
                var name = img_path.split('\\');
                var logo_name = name[2];


                //Nombre del logo de la nueva imagen
                let reg = await Config.findByIdAndUpdate({ _id: "6308f0f03f3dba885123aca9" }, {
                    categorias: JSON.parse(data.categorias),
                    titulo: data.titulo,
                    serie: data.serie,
                    logo: logo_name,
                    correlativo: data.correlativo,
                });

                //Eliminar imagen anterior
                fs.stat('./uploads/configuraciones/' + reg.logo, function (err) {
                    if (!err) {
                        fs.unlink('./uploads/configuraciones/' + reg.logo, (error) => {
                            if (error) throw error;
                        });
                    } else {

                    }
                });

                res.status(200).send({ data: reg });
            } else {
                let reg = await Config.findByIdAndUpdate({ _id: "6308f0f03f3dba885123aca9" }, {
                    categorias: data.categorias,
                    titulo: data.titulo,
                    serie: data.serie,
                    correlativo: data.correlativo,
                });
                res.status(200).send({ data: reg });
            }
        } else {
            res.status(500).send({ message: 'NoAccess' });
        }
    } else {
        res.status(500).send({ message: 'NoAccess' });
    }
}


const obtener_config_admin = async function (req, res) {
    if (req.user) {
        if (req.user.role = "admin") {

            let reg = await Config.findById({ _id: '6308f0f03f3dba885123aca9' });

            res.status(200).send({ data: reg });
        } else {
            res.status(500).send({ message: 'NoAccess' });
        }
    } else {
        res.status(500).send({ message: 'NoAccess' });
    }
}

//Obtener Imagen
const obtener_logo = async function (req, res) {
    var img = req.params['img'];
    fs.stat('./uploads/configuraciones/' + img, function (err) {
        if (!err) {
            let path_img = './uploads/configuraciones/' + img;
            res.status(200).sendFile(path.resolve(path_img));
        } else {
            let path_img = './uploads/default.jpg';
            res.status(200).sendFile(path.resolve(path_img));
        }
    })
}

module.exports = {
    actualizar_config_admin,
    obtener_config_admin,
    obtener_logo
}