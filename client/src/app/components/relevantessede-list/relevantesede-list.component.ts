import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params} from '@angular/router';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { Relevantesede } from '../../models/relevantesede';
import {GLOBAL} from '../../services/global';
import { RelevantesedeService } from '../../services/relevantesede.service';

@Component ({

  selector: 'relevantessede-list',
  templateUrl: './relevantesede-list.component.html',

  providers: [UserService, RelevantesedeService] //cargar los servicios dentro de esta clase

})

export class RelevantesedelistComponent implements OnInit{

public title: string;
public identity;
public token;
public url;
public status;
public page;
public total;
public pages;
public publications: Relevantesede[];

constructor(

private _route: ActivatedRoute,
private _router: Router,
private _userService: UserService,
private _relevantesedeService: RelevantesedeService


){
  this.title = 'Informes de Actividades Relevantes SEDE';
  this.identity = this._userService.getIdentity();
  this.token = this._userService.getToken();
  this.url = GLOBAL.url;
  this.page = 1;
}
ngOnInit(){

console.log('Componente-list SEDE  cargado...');
this.getPublications(this.page);
}

getPublications(page){
  this._relevantesedeService.getRelevantesedes(this.token, page).subscribe(
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
