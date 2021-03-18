import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params} from '@angular/router';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { Select_empleadoService } from '../../services/select_empleado.service';
import { Follow } from '../../models/follow';
import { GLOBAL } from '../../services/global';

@Component ({

  selector: 'profile',
  templateUrl: './profile.component.html',

  providers: [UserService, Select_empleadoService] //cargar los servicios dentro de esta clase

})
export class ProfileComponent implements OnInit{

public title: string;
public user: User;
public status: string;
public identity;
public token;
public url;
//public next_page;
//public prev_page;
//public page;
//public total;
//public pages;
public follow;

constructor(

private _route: ActivatedRoute,
private _router: Router,
private _userService: UserService,
private _select_empleadoService: Select_empleadoService

){

this.title = 'Información Personal Empleados';
this.identity = this._userService.getIdentity();
this.token = this._userService.getToken();
this.url = GLOBAL.url;
//this.next_page = 1;
//this.prev_page = 1;

}
ngOnInit(){
  console.log('profile.component.ts cargado');
  this.loadPage();
}

loadPage(){
  this._route.params.subscribe(params => {
    let id = params['id'];
    this.getUser(id);
  });
}
getUser(id){
  this._userService.getUser(id).subscribe(


  response =>{
    if(response.user){
      console.log(response);
      this.user = response.user;
    }else{
      this.status = 'error';
    }
  },
  error => {
    console.log(<any>error);
    this._router.navigate(['/perfil',this.identity._id]);

  }
  );
}
}
