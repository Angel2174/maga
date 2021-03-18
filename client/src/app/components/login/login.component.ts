import { Component, OnInit} from '@angular/core';

import { Router, ActivatedRoute, Params} from '@angular/router';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';

@Component ({

  selector: 'login',
  templateUrl: './login.component.html',  //vista del componente
    providers: [UserService] //cargar los servicios dentro de esta clase

})

export class LoginComponent implements OnInit{

public title: string;
public user: User;
public status: string;
public identity;//objeto de un usuario identificado
public token;//el token del usuario , nos autenticamos en el api


constructor(

private _route: ActivatedRoute,
private _router: Router,

private _userService: UserService

){
this.title = 'Indentificate';
this.user = new User("","","","","","","","","","","","","","","","","","");


}
ngOnInit(){

console.log('Componente de login cargado...');
}

onSubmit(){
//loguear al usuario y conseguir sus datos
this._userService.signup(this.user).subscribe(
response => {

  this.identity = response.user;

  console.log(this.identity);


  if(!this.identity || !this.identity._id){
    this.status = 'error';
  }else{
    this.status = 'success';

    //persistir datos del usuario
localStorage.setItem('identity', JSON.stringify(this.identity));
    //conseguir el token
        this.getToken(); //dos peticiones ajax para sacar el objeto del usuario y otro para sacar el token del user identificado
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

getToken(){
  this._userService.signup(this.user, 'true').subscribe(
  response => {

    this.token = response.token;

    console.log(this.token);


    if(this.token.length <= 0){
      this.status = 'error';
    }else{
      this.status = 'success';

      //persistir token del usuario
localStorage.setItem('token', this.token);
      //conseguir contadores


this._router.navigate(['/']); // cuando acabe el login redireccionar a la pagina home
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
