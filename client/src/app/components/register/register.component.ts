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

constructor(

private _route: ActivatedRoute,
private_router: Router,

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
"ROLE_USER",
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

    console.log(response.user);
  }
},
error => {
  console.log(<any>error);
}
);
}

}
