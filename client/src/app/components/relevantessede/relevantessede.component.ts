import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params} from '@angular/router';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { Relevantesede } from '../../models/relevantesede';
import {GLOBAL} from '../../services/global';
import { RelevantesedeService } from '../../services/relevantesede.service';
@Component ({

  selector: 'relevantessede',
  templateUrl: './relevantessede.component.html',

  providers: [UserService, RelevantesedeService] //cargar los servicios dentro de esta clase

})

export class RelevantessedeComponent implements OnInit{

public title: string;
public identity;
public token;
public url;
public status;
public relevantesede: Relevantesede;

constructor(

private _route: ActivatedRoute,
private _router: Router,
private _userService: UserService,
private _relevantesedeService: RelevantesedeService

){

this.title = 'Informe de Actividades Relevantes SEDE';
this.identity = this._userService.getIdentity();
this.token = this._userService.getToken();
this.url = GLOBAL.url;
this.relevantesede = new Relevantesede("","","",this.identity._id,"","","","","","","","","");

}
ngOnInit(){

console.log('Componente de Relevantessede cargado...');
}
onSubmit(form){
  this._relevantesedeService.addRelevantesede(this.token, this.relevantesede).subscribe(
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
