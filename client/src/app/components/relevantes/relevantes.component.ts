import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params} from '@angular/router';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { Relevante } from '../../models/relevante';
import {GLOBAL} from '../../services/global';
import { RelevanteService } from '../../services/relevante.service';
@Component ({

  selector: 'relevantes',
  templateUrl: './relevantes.component.html',

  providers: [UserService, RelevanteService] //cargar los servicios dentro de esta clase

})

export class RelevantesComponent implements OnInit{

public title: string;
public identity;
public token;
public url;
public status;
public relevante: Relevante;

constructor(

private _route: ActivatedRoute,
private _router: Router,
private _userService: UserService,
private _relevanteService: RelevanteService

){

this.title = 'Informe de Actividades Relevantes SNER';
this.identity = this._userService.getIdentity();
this.token = this._userService.getToken();
this.url = GLOBAL.url;
this.relevante = new Relevante("","","",this.identity._id,"","","","","","","","","");

}
ngOnInit(){

console.log('Componente de Relevantes cargado...');
}
onSubmit(form){
  this._relevanteService.addRelevante(this.token, this.relevante).subscribe(
    response => {
      if(response){
        this.status = 'success';
        form.reset();
      }else{
        this.status = 'error';
      }
    },
    error => {
      var errorMessage = <any>error;
      console.log(errorMessage);
      if(errorMessage != null){
        this.status = 'error';
      }

    }
  );

}


}
