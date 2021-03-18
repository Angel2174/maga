import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params} from '@angular/router';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { Relevante } from '../../models/relevante';
import {GLOBAL} from '../../services/global';
import { RelevanteService } from '../../services/relevante.service';

@Component ({

  selector: 'relevantes-list',
  templateUrl: './relevante-list.component.html',

  providers: [UserService, RelevanteService] //cargar los servicios dentro de esta clase

})

export class RelevantelistComponent implements OnInit{

public title: string;
public identity;
public token;
public url;
public status;
public page;
public total;
public pages;
public publications: Relevante[];

constructor(

private _route: ActivatedRoute,
private _router: Router,
private _userService: UserService,
private _relevanteService: RelevanteService


){
  this.title = 'Informes de Actividades Relevantes SNER';
  this.identity = this._userService.getIdentity();
  this.token = this._userService.getToken();
  this.url = GLOBAL.url;
  this.page = 1;
}
ngOnInit(){

console.log('Componente-list  cargado...');
this.getPublications(this.page);
}

getPublications(page){
  this._relevanteService.getRelevantes(this.token, page).subscribe(
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
