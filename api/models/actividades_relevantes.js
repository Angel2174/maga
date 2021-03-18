'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Actividades_relevantes_snerSchema = Schema({

  fecha_de: String,
  fecha_al: String,
  user: {type: Schema.ObjectId, ref: 'User'},
  telefono: String,
  accion_estrategica: String,
  responsables: String,
  objetivos: String,
  resultados: String,
  beneficiarios: String,
  lugar_de_ejecucion: String,
  fotos: String,
  created_at: String


});

module.exports = mongoose.model('Actividades_relevantes_sner', Actividades_relevantes_snerSchema); // los parametros son ('nombre de la entidad', su_esquema)
