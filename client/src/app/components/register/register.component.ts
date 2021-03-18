import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute, Params} from '@angular/router';
import { User } from '../../models/user';

import { UserService } from '../../services/user.service';

@Component ({

  selector: 'register',
  templateUrl: './register.component.html',

  providers: [UserService] //cargar los servicios dentro de esta clase

})

export class RegisterComponent implements OnInit{

public title: string;
public user: User;
public status: string;

constructor(

private _route: ActivatedRoute,
private _router: Router,

private _userService: UserService

){

this.title = 'Registrar nuevo usuario';

this.user = new User(
"",
"",
"",
"",
"",
"",
"",
"",
"",
"",
"",
"",
"",
"",
"",
"",
"",
""
)

}
ngOnInit(){

console.log('Componente de Registrate cargado...');
}

//recibir la informacion del formulario

onSubmit(){



this._userService.register(this.user).subscribe(
response => {
  if(response.user && response.user._id){
      this.status = 'success';
    console.log(response.user);
  }else{
    this.status = 'error';
  }
},
error => {
  console.log(<any>error);
}
);
}

}
