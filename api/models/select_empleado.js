'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Select_empleadoSchema = Schema({

  user: {type: Schema.ObjectId, ref: 'User'},
  selectempleado: {type: Schema.ObjectId, ref: 'User'}

});

module.exports = mongoose.model('Select_empleado', Select_empleadoSchema);
