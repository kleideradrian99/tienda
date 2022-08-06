//Logica para verificar los tokens
'use strict'

var jwt = require('jwt-simple');
var moment = require('moment');
var secret = 'kleider321';

exports.auth = function(req, res, next) {

    if (!req.headers.authorization) {
        return res.status(403).send({ message: 'NoHeadersError' });
    }

    var token = req.headers.authorization.replace(/['"]+/g, '');
    //Divimos el token en 3
    var segment = token.split('.');

    if (segment.length != 3) {
        return res.status(403).send({ message: 'Invalidtoken' });
    } else {
        try {
            var payload = jwt.decode(token, secret);
            //Validar expiracion del token
            if (payload.exp <= moment().unix()) {
                return res.status(403).send({ message: 'TokenExpirate' });
            }


        } catch (error) {
            return res.status(403).send({ message: 'Invalidtoken' });
        }
    }
    //Enviar token ya decodificado
    req.user = payload;

    next();
}