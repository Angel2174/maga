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
  role_alternativo:String,
  image: String,
  dpi: String,
  doc_dpi: String,
  puesto: String,
  fecha_nac: String,
  num_contrato: String,
  titulo_nivel_medio: String,
  doc_lvl_medio: String,
  titulo_universitario: String,
  doc_lvl_universitario: String,
  num_colegiado_activo: String,
  doc_num_colegiado_activo: String,
  num_nit: String,
  doc_RTU: String,
  Lugar_de_trabajo: String,
  fecha_inic_labor: String,
  created_at: String

});

module.exports = mongoose.model('User', UserSchema); // los parametros son ('nombre de la entidad', su_esquema)
