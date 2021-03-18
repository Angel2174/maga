import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params} from '@angular/router';

import { GLOBAL } from '../../services/global';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';
import { Select_empleadoService } from '../../services/select_empleado.service';
import { Follow } from '../../models/follow';
@Component ({

  selector: 'user-list',
  templateUrl: './user-list.component.html',

  providers: [UserService, Select_empleadoService] //cargar los servicios dentro de esta clase

})

export class UserListComponent implements OnInit{

public title: string;
public users: User[];
public identity;
public token;
public url: string;
public next_page;
public prev_page;
public status: string;
public page;
public total;
public pages;
public follows;

constructor(

private _route: ActivatedRoute,
private _router: Router,
private _userService: UserService,
private _select_empleadoService: Select_empleadoService

){

this.title = 'Listado de Empleados';
this.identity = this._userService.getIdentity();
this.token = this._userService.getToken();
this.url = GLOBAL.url;
this.next_page = 1;
this.prev_page = 1;

}

ngOnInit(){
  console.log('user-list.component.ts cargado');
  this.actualPage();// llamar al metodo conseguir listado de usuarios

}

actualPage(){
  this._route.params.subscribe(params => {
    let page = +params['page'];
    this.page = page;

    if(!page){
      page = 1;
    }else{
      this.next_page = page+1;
      this.prev_page = page-1;

      if(this.prev_page <= 0){
        this.prev_page = 1;
      }
    }
    //devolver listado de usuarios
    this.getUsers(page);
  });
}
//peticion al servicio de angular y peticion al back end
getUsers(page){
  this._userService.getUsers(page).subscribe(
  response => {
    if(!response.users){
      this.status = 'error';
    }else{
      this.total = response.total;
      this.users = response.users;
      this.pages = response.pages;
      this.follows = response.users_following;
      if(page > this.pages){
        this._router.navigate(['/user-list',1]);
      }
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

public followUserOver;
mouseEnter(user_id){
  this.followUserOver = user_id;
}
mouseLeave(user_id){
  this.followUserOver = 0;
}

Select_empleadoUser(selectempleado){
  var select_empleado = new Follow('',this.identity._id, selectempleado);

  this._select_empleadoService.addSelect_empleado(this.token, select_empleado ).subscribe(
  response => {
    if(!response.select_empleado){
      this.status = 'error';
    }else{
      this.status = 'success';
      this.follows.push(selectempleado);
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

unfollowUser(followed){
  this._select_empleadoService.deleteSelect_empleado(this.token, followed).subscribe(
  response =>{
    var search = this.follows.indexOf(followed);
    if(search != -1){
      this.follows.splice(search, 1);
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

refresh(event = null){
  this.getUsers(1);
}
public confirmado;
onDeleteConfirm(id){
  this.confirmado = id;
}

onCancelUser(){
  this.confirmado = null;
}

deleteUser(id){
  this._userService.deleteUser(id).subscribe(
    response => {
      console.log('correcto');

    },
    error => {
      console.log(<any>error);
    console.log('aqui esta el error');


    }
  );
}



/*onDeleteUser(id){
  this._userService.deleteUser(this.token, id).subscribe(
    response => {
      if(!response.user){
        alert('Error ern el servidor');
      }
      this.getUsers();
    },
    error => {
      var errorMessage = <any>error;

      if(errorMessage != null){
        var body = JSON.parse(error._body);

        console.log(error);

      }
    }
  )
}*/

}
