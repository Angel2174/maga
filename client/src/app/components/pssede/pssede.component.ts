import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params} from '@angular/router';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { Pssede } from '../../models/pssede';
import {GLOBAL} from '../../services/global';
import { PssedeService } from '../../services/pssede.service';
@Component ({

  selector: 'pssede',
  templateUrl: './pssede.component.html',

  providers: [UserService, PssedeService] //cargar los servicios dentro de esta clase

})
export class PssedesComponent implements OnInit{

public title: string;
public identity;
public token;
public url;
public status;
public pssede: Pssede;

constructor(

private _route: ActivatedRoute,
private _router: Router,
private _userService: UserService,
private _pssedeService: PssedeService

){

this.title = 'Informe de Planificación Semanal SEDE';
this.identity = this._userService.getIdentity();
this.token = this._userService.getToken();
this.url = GLOBAL.url;
this.pssede = new Pssede("","","",this.identity._id);

}
ngOnInit(){

console.log('Componente de Pssede cargado...');
}
onSubmit(form){
  this._pssedeService.addPssede(this.token, this.pssede).subscribe(
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
