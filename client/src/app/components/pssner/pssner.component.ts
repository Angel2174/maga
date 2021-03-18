import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params} from '@angular/router';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { Pssner } from '../../models/pssner';
import {GLOBAL} from '../../services/global';
import { PssnerService } from '../../services/pssner.service';
@Component ({

  selector: 'pssner',
  templateUrl: './pssner.component.html',

  providers: [UserService, PssnerService] //cargar los servicios dentro de esta clase

})
export class PssnersComponent implements OnInit{

public title: string;
public identity;
public token;
public url;
public status;
public pssner: Pssner;

constructor(

private _route: ActivatedRoute,
private _router: Router,
private _userService: UserService,
private _pssnerService: PssnerService

){

this.title = 'Informe de Planificación Semanal SNER';
this.identity = this._userService.getIdentity();
this.token = this._userService.getToken();
this.url = GLOBAL.url;
this.pssner = new Pssner("","","",this.identity._id);

}
ngOnInit(){

console.log('Componente de Pssner cargado...');
}
onSubmit(form){
  this._pssnerService.addPssner(this.token, this.pssner).subscribe(
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
