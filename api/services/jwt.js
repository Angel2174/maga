'use strict'

var jwt = require('jwt-simple');
var moment = require('moment');

var jwt = require('jwt-simple'); //cargar el jwt
var moment = require('moment'); //para generar fechas
var secret = 'clave_secreta'; // clave secreta solo desarrollador conoce..generar el token

exports.createToken = function(user) {
  var payload = {
    sub: user._id,
    name: user.name,
    surname: user.surname,
    username: user.username,
    email: user.email,
    role: user.role,
    image: user.image,
    iat: moment().unix(),
    exp: moment().add(30, 'days').unix
  };
  return jwt.encode(payload, secret);
};
