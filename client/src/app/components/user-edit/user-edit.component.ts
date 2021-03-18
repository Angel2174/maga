import { Component, OnInit} from '@angular/core';
import { Router, ActivatedRoute, Params} from '@angular/router';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { UploadService } from '../../services/upload.service';
import { GLOBAL } from '../../services/global';

@Component ({

  selector: 'user-edit',
  templateUrl: './user-edit.component.html',  //vista del componente
    providers: [UserService, UploadService] //cargar los servicios dentro de esta clase

})

export class UserEditComponent implements OnInit{

public title: string;
public user: User;
public status: string;
public identity;//objeto de un usuario identificado
public token;//el token del usuario , nos autenticamos en el api
public url: string;


constructor(

private _route: ActivatedRoute,
private _router: Router,
private _userService: UserService,
private _uploadService: UploadService

){
this.title = 'Actualizar Mis Datos';
this.user = this._userService.getIdentity();
this.identity = this.user;
this.token = this._userService.getToken();
this.url = GLOBAL.url;

}
ngOnInit(){
console.log(this.user);

console.log('user-edit.component se ha cargado');
}

onSubmit(){
  console.log(this.user);

  this._userService.updateUser(this.user).subscribe(
  response => {
    if(!response.user){
      this.status = 'error';
    }else{
      this.status = 'success';
      localStorage.setItem('identity', JSON.stringify(this.user));
      this.identity = this.user;

      //subida de imagen
      this._uploadService.makeFileRequest(this.url+'upload-image-user/'+this.user._id, [], this.filesToUpload, this.token, 'image')
                          .then((result: any) => {

                            this.user.image = result.user.image;
                            localStorage.setItem('identity', JSON.stringify(this.user));
                          });

      //subida de imagen dpi
    /*  this._uploadService.makeFileRequest(this.url+'upload-dpi-user/'+this.user._id, [], this.filesToUpload, this.token, 'doc_dpi')
                          .then((result: any) => {

                            this.user.doc_dpi = result.user.doc_dpi;
                            localStorage.setItem('identity', JSON.stringify(this.user));
                          });*/
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
public filesToUpload: Array<File>;
fileChangeEvent(fileInput: any){
  this.filesToUpload = <Array<File>>fileInput.target.files;
}

}
