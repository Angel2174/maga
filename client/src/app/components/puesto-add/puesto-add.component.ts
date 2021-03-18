import { Component, OnInit} from '@angular/core';
import { Router, ActivatedRoute, Params} from '@angular/router';
import { GLOBAL } from '../../services/global';

import { Puesto } from '../../models/puesto';

import { UserService } from '../../services/user.service';
import { PuestoService } from '../../services/puesto.service';
@Component ({

  selector: 'puesto-add',
  templateUrl: './puesto-add.component.html',  //vista del componente
    providers: [UserService, PuestoService] //cargar los servicios dentro de esta clase

})

export class PuestoAddComponent implements OnInit{

public title: string;
public puesto: Puesto;
public status: string;
public identity;//objeto de un usuario identificado
public token;//el token del usuario , nos autenticamos en el api
public url: string;


constructor(

private _route: ActivatedRoute,
private _router: Router,
private _userService: UserService,
private _puestoService: PuestoService

){
this.title = 'Crear Puesto';
this.identity = this._userService.getIdentity();
this.token = this._userService.getToken();
this.url = GLOBAL.url;
this.puesto = new Puesto("","");

}

ngOnInit(){
  console.log('puesto-add.component.ts cargado');

}

onSubmit(){

  this._puestoService.addPuesto(this.puesto).subscribe(
  response => {
    if(response.puesto && response.puesto._id){

      console.log(response.puesto);
    }
  },
  error => {
    console.log(<any>error);
  }
  );
}

}
