'use strict'

var mongoose = require('mongoose');


var app = require('./app'); //aqui adentro esta express.
var port = 3800; //indicar el puerto en el que vamos a trabajar.

mongoose.set('useFindAndModify', false);
mongoose.Promise = global.Promise;


//mongoose.connect('mongodb://localhost:27017/pro_maga', {useMongoClient: true})
mongoose.connect('mongodb://localhost:27017/pro_maga', {  useNewUrlParser:true, useUnifiedTopology: true}
)
		    .then(() => {
  			     console.log(" conexion a pro_maga exitosa");
//crear el servidor
             app.listen(port, () => {
               console.log("servidor corriendo en http://localhost:3800");
             })

           })
  			.catch(err => console.log(err));
