'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Planificacion_semanal_snerSchema = Schema({

  actividad: String,
  created_at: String,
  user: {type: Schema.ObjectId, ref: 'User'}

});

module.exports = mongoose.model('Planificacion_semanal_sner', Planificacion_semanal_snerSchema);
