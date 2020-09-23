'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = Schema({

  name: String,
  surname: String,
	 username: String,
	 email: String,
  password: String,
  role: String,
  image: String
});

module.exports = mongoose.model('User', UserSchema); // los parametros son ('nombre de la entidad', su_esquema)
