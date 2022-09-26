'use strict'

var producto = require('../models/producto');
var Inventario = require('../models/inventario');
var fs = require('fs');
var path = require('path');
const Producto = require('../models/producto');

const registro_producto_admin = async function (req, res) {
    if (req.user) {
        if (req.user.role = "admin") {
            let data = req.body;
            //Guardar registro
            var img_path = req.files.portada.path;
            var name = img_path.split('\\');
            var portada_name = name[2];

            data.slug = data.titulo.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
            data.portada = portada_name;

            let reg = await producto.create(data);

            //Registro para el inventario
            let inventario = await Inventario.create({
                admin: req.user.sub,
                cantidad: data.stock,
                proveedor: 'Primer Registro',
                producto: reg._id
            });

            res.status(200).send({ data: reg, inventario: inventario });

        } else {
            res.status(500).send({ message: 'NoAccess' });
        }
    } else {
        res.status(500).send({ message: 'NoAccess' });
    }
}

const listar_producto_admin = async function (req, res) {
    if (req.user) {
        if (req.user.role = "admin") {
            var filtro = req.params['filtro'];
            let reg = await producto.find({ titulo: new RegExp(filtro, 'i') })

            res.status(200).send({ data: reg });

        } else {
            res.status(500).send({ message: 'NoAccess' });
        }
    } else {
        res.status(500).send({ message: 'NoAccess' });
    }
}

//Obtener Imagen
const obtener_portada = async function (req, res) {
    var img = req.params['img'];
    fs.stat('./uploads/productos/' + img, function (err) {
        if (!err) {
            let path_img = './uploads/productos/' + img;
            res.status(200).sendFile(path.resolve(path_img));
        } else {
            let path_img = './uploads/default.jpg';
            res.status(200).sendFile(path.resolve(path_img));
        }
    })
}

const obtener_producto_admin = async function (req, res) {
    if (req.user) {
        if (req.user.role == 'admin') {
            var id = req.params['id'];
            try {
                var reg = await producto.findById({ _id: id });
                res.status(200).send({ data: reg });
            } catch (error) {
                res.status(200).send({ data: undefined });
            }
        } else {
            res.status(500).send({ message: 'NoAccess' });
        }
    } else {
        res.status(500).send({ message: 'NoAccess' });
    }
}

const actualizar_producto_admin = async function (req, res) {
    if (req.user) {
        if (req.user.role = "admin") {
            let id = req.params['id'];
            let data = req.body;

            if (req.files) {
                //Si hay una imagen
                var img_path = req.files.portada.path;
                var name = img_path.split('\\');
                var portada_name = name[2];

                let reg = await producto.findByIdAndUpdate({ _id: id }, {
                    titulo: data.titulo,
                    stock: data.stock,
                    precio: data.precio,
                    categoria: data.categoria,
                    descripcion: data.descripcion,
                    contenido: data.contenido,
                    portada: portada_name
                });

                //Eliminar imagen anterior
                fs.stat('./uploads/productos/' + reg.portada, function (err) {
                    if (!err) {
                        fs.unlink('./uploads/productos/' + reg.portada, (error) => {
                            if (error) throw error;
                        });
                    } else {

                    }
                })


                res.status(200).send({ data: reg });

            } else {
                //Si no hay imagen
                let reg = await producto.findByIdAndUpdate({ _id: id }, {
                    titulo: data.titulo,
                    stock: data.stock,
                    precio: data.precio,
                    categoria: data.categoria,
                    descripcion: data.descripcion,
                    contenido: data.contenido,
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

const eliminar_producto_admin = async function (req, res) {
    if (req.user) {
        if (req.user.role == 'admin') {

            var id = req.params['id'];

            let reg = await producto.findByIdAndRemove({ _id: id });
            res.status(200).send({ data: reg });

        } else {
            res.status(500).send({ message: 'NoAccess' });
        }
    } else {
        res.status(500).send({ message: 'NoAccess' });
    }
}

//Listar el inventario
const listar_inventario_admin = async function (req, res) {
    if (req.user) {
        if (req.user.role == 'admin') {

            var id = req.params['id'];

            let reg = await Inventario.find({ producto: id }).populate('admin').sort({ createdAt: -1 });

            res.status(200).send({ data: reg });

        } else {
            res.status(500).send({ message: 'NoAccess' });
        }
    } else {
        res.status(500).send({ message: 'NoAccess' });
    }
}

const eliminar_inventario_admin = async function (req, res) {
    if (req.user) {
        if (req.user.role == 'admin') {
            //Obtenemos el di del inventario
            var id = req.params['id'];
            //Eliminar Inventario
            let reg = await Inventario.findByIdAndRemove({ _id: id });
            //Obtenemos el registro del producto
            let prod = await Producto.findById({ _id: reg.producto });
            //Calcular el nuevo stock
            let nuevo_stock = parseInt(prod.stock) - parseInt(reg.cantidad);
            //Actualización del Nuevo Stock al nuevo producto
            let producto = await Producto.findByIdAndUpdate({ _id: reg.producto }, {
                stock: nuevo_stock
            });
            res.status(200).send({ data: reg });

        } else {
            res.status(500).send({ message: 'NoAccess' });
        }
    } else {
        res.status(500).send({ message: 'NoAccess' });
    }
}

const registro_inventario_producto_admin = async function (req, res) {
    if (req.user) {
        if (req.user.role == 'admin') {

            let data = req.body;
            let reg = await Inventario.create(data);

            //Obtenemos el registro del producto
            let prod = await Producto.findById({ _id: reg.producto });
            //Calcular el nuevo stock
            //Stock ACTUAL          //STOCK AUMENTAR
            let nuevo_stock = parseInt(prod.stock) + parseInt(reg.cantidad);
            //Actualización del Nuevo Stock al nuevo producto
            let producto = await Producto.findByIdAndUpdate({ _id: reg.producto }, {
                stock: nuevo_stock
            });

            res.status(200).send({ data: reg });

        } else {
            res.status(500).send({ message: 'NoAccess' });
        }
    } else {
        res.status(500).send({ message: 'NoAccess' });
    }
}

const actualizar_producto_variedades_admin = async function (req, res) {
    if (req.user) {
        if (req.user.role = "admin") {
            let id = req.params['id'];
            let data = req.body;

            let reg = await producto.findByIdAndUpdate({ _id: id }, {
                titulo_variedad: data.titulo_variedad,
                variedades: data.variedades
            });
            res.status(200).send({ data: reg });

        } else {
            res.status(500).send({ message: 'NoAccess' });
        }
    } else {
        res.status(500).send({ message: 'NoAccess' });
    }
}

const agregar_imagen_galeria_admin = async function (req, res) {
    if (req.user) {
        if (req.user.role = "admin") {
            let id = req.params['id'];
            let data = req.body;

            //Obtenemos la imagen con el nombre
            var img_path = req.files.imagen.path;
            var name = img_path.split('\\');
            var imagen_name = name[2];

            //Funcion para agregar imagen al array
            let reg = await producto.findByIdAndUpdate({ _id: id }, {
                $push: {
                    galeria: {
                        imagen: imagen_name,
                        _id: data._id
                    }
                }
            });

            res.status(200).send({ data: reg });

        } else {
            res.status(500).send({ message: 'NoAccess' });
        }
    } else {
        res.status(500).send({ message: 'NoAccess' });
    }
}

const eliminar_imagen_galeria_admin = async function (req, res) {
    if (req.user) {
        if (req.user.role = "admin") {
            let id = req.params['id'];
            let data = req.body;

            //Funcion para agregar imagen al array
            let reg = await producto.findByIdAndUpdate({ _id: id }, {
                $pull: {
                    galeria: {
                        _id: data._id
                    }
                }
            });

            res.status(200).send({ data: reg });

        } else {
            res.status(500).send({ message: 'NoAccess' });
        }
    } else {
        res.status(500).send({ message: 'NoAccess' });
    }
}


// METODOS PUBICOS TIENDA --------------------------------------------------------

const listar_producto_publico = async function (req, res) {
    var filtro = req.params['filtro'];
    let reg = await producto.find({ titulo: new RegExp(filtro, 'i') })

    res.status(200).send({ data: reg });
}

const obtener_producto_slug_publico = async function (req, res) {
    var slug = req.params['slug'];
    let reg = await producto.findOne({ slug: slug })

    res.status(200).send({ data: reg });
}

module.exports = {
    registro_producto_admin,
    listar_producto_admin,
    obtener_portada,
    obtener_producto_admin,
    actualizar_producto_admin,
    eliminar_producto_admin,
    listar_inventario_admin,
    eliminar_inventario_admin,
    registro_inventario_producto_admin,
    actualizar_producto_variedades_admin,
    agregar_imagen_galeria_admin,
    eliminar_imagen_galeria_admin,
    listar_producto_publico,
    obtener_producto_slug_publico
}