'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PuestoSchema = Schema({

  name: String

});

module.exports = mongoose.model('Puesto', PuestoSchema); // los parametros son ('nombre de la entidad', su_esquema)
