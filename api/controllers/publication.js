'use strict'
var path = require('path');
var fs = require('fs');
var moment = require('moment');
var mongoosePaginate = require('mongoose-pagination');

var User = require('../models/user');
var Publication = require('../models/actividades_relevantes');
var Select_empleado = require('../models/select_empleado');

function probando(req, res) {

  res.status(200).send({
	   message: 'hola desde controlador Relevantes '
	 });

}

function savePublication(req, res){
  var params = req.body;

  if(!params.fecha_de && !params.fecha_al && !params.telefono && !params.accion_estrategica &&
  !params.responsables && !params.objetivos && !params.resultados && !params.beneficiarios &&
!params.lugar_de_ejecucion && !params.fotos) return res.status(200).send({message: 'debes enviar los campos'});

var publication = new Publication();
publication.fecha_de = params.fecha_de;
publication.fecha_al = params.fecha_al;
publication.user = req.user.sub;
publication.telefono = params.telefono;
publication.accion_estrategica = params.accion_estrategica;
publication.responsables = params.responsables;
publication.objetivos = params.objetivos;
publication.resultados = params.resultados;
publication.beneficiarios = params.beneficiarios;
publication.lugar_de_ejecucion = params.lugar_de_ejecucion;
publication.fotos = 'null';
publication.created_at = moment().unix();

publication.save((err, publicationStored) => {
  if(err) return res.status(500).send({message: 'error al guardar el informe'});

  if(!publicationStored) return res.status(404).send({message: 'el informe no ha sido guardado'});

  return res.status(200).send({publication: publicationStored});
})

  var publication = new Publication();
}

function getPublications(req, res){
  var page = 1;
  if(req.params.page){
    page = req.params.page;
  }
  var itemsPerPage = 4;

  Select_empleado.find({user: req.user.sub}).populate('selectempleado').exec((err, select_empleados) => {
    if(err) return res.status(500).send({message: 'error al seleccionar empleado'});

    var select_empleados_clean = [];

    select_empleados.forEach((select_empleado) => {
      select_empleados_clean.push(select_empleado.selectempleado);
    });
    Publication.find({user: {"$in": select_empleados_clean}}).sort('-created_at').populate('user').paginate(page, itemsPerPage, (err, publications, total) => {
      if(err) return res.status(500).send({message: 'error al devolver Informes'});

      if(!publications) return res.status(404).send({message: 'no hay informes'});

      return res.status(200).send({
        total_items: total,
        pages: Math.ceil(total/itemsPerPage),
        page: page,
        publications
      });
    });
  });



}

module.exports = {
  probando,
  savePublication,
  getPublications
}
