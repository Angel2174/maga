'use strict'

var mongoosePaginate = require('mongoose-pagination');

var Puesto = require('../models/puesto');

function prueba(req, res){

  res.status(200).send({message: 'hola desde puestos'});
}

function savePuesto(req, res){

var puesto = new Puesto();

var params = req.body;

puesto.name = params.name;

puesto.save((err, puestoStored) => {
  if(err){
    res.status(500).send({message: 'Error al guardar el puesto'});
  }else{
    if(!puestoStored){
      res.status(404).send({message: 'el puesto no ha sido guardado'});
    }else{
      res.status(200).send({puesto: puestoStored});
    }
  }
});

}

//obtener puesto de la BD

function getPuesto(req, ses){
  var puestoId = req.params.id;

  Puesto.findById(puestoId, (err, puesto) => {
    if(err){
      res.status(500).send({message: 'Error en la peticion'});
    }else{
      if(!puesto){
        res.status(404).send({message: 'El puesto no existe'});
      }else{
        res.status(200).send({puesto});
      }
    }

  });

}

//paginar listado de puestos

function getPuestos(req, res){

  if(req.params.page){
    var page = req.params.page;
  }else{
    var page = 1;
  }

  var itemsPerPage = 1;

  Puesto.find().sort('name').paginate(page, itemsPerPage, function(err, puestos, total){
    if(err){
      res.status(500).send({message: 'Error en la peticion'});
    }else{
      if(!puestos){
        res.status(404).send({message: 'no hay puestos' });
      }else{
        return res.status(200).send({
          pages: total,
          puestos: puestos
        });
      }
    }
  });
}

function deletePuesto(req, res){
  var puestoId = req.params.id;

  Puesto.findByIdAndRemove(puestoId, (err, puestoRemoved) => {
    if(err){
      res.status(500).send({message: 'Error al borrar el puesto'});
    }else{
      if(!puestoRemoved){
        res.status(404).send({message: 'el puesto no ha sido eliminado'});
      }else{
        res.status(404).send({puestoRemoved});
      }
    }
  });

}





module.exports = {
   prueba,
   savePuesto,
   getPuesto,
   getPuestos,
   deletePuesto
  }
