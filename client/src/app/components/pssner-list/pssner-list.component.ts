import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params} from '@angular/router';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { Pssner } from '../../models/pssner';
import {GLOBAL} from '../../services/global';
import { PssnerService } from '../../services/pssner.service';

@Component ({

  selector: 'pssner-list',
  templateUrl: './pssner-list.component.html',

  providers: [UserService, PssnerService] //cargar los servicios dentro de esta clase

})
export class PssnerlistComponent implements OnInit{

public title: string;
public identity;
public token;
public url;
public status;
public page;
public total;
public pages;
public publications: Pssner[];

constructor(

private _route: ActivatedRoute,
private _router: Router,
private _userService: UserService,
private _pssnerService: PssnerService


){
  this.title = 'Informes de Planificación Semanal SNER';
  this.identity = this._userService.getIdentity();
  this.token = this._userService.getToken();
  this.url = GLOBAL.url;
  this.page = 1;
}
ngOnInit(){

console.log('Componente-list SNER  cargado...');
this.getPublications(this.page);
}

getPublications(page){
  this._pssnerService.getPssners(this.token, page).subscribe(
  response => {
if(response.publications){
  this.total = response.total_items;
  this.pages = response.pages;
  this.publications = response.publications;

  if(page > this.pages){
    this._router.navigate(['/home']);
  }
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
