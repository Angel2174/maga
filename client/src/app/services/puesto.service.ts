import { Injectable} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
//import {Http, Response, Headers} from 'angular/http';
import { Observable } from 'rxjs';
import { GLOBAL } from './global';
import { Puesto } from '../models/puesto';
//import 'rxjs/add/operator/map';


@Injectable()
export class PuestoService{
public url:string;

public identity;
public token;

constructor(public _http: HttpClient){

  this.url = GLOBAL.url;
}

/*addPuesto(token, puesto: Puesto){
  let params = JSON.stringify(puesto);
  let headers = new Headers({
    'Content-Type' : 'application/json',
    'Authorization':token
  });
  return this._http.post(this.url+'puesto', params, {headers: headers})
                    .map(res => res.json());
}*/

addPuesto(puesto: Puesto): Observable<any>{
  let params = JSON.stringify(puesto);

  let headers = new HttpHeaders().set('Content-Type', 'application/json');

  return this._http.post(this.url+'puesto-add', params, {headers:headers});
}

signup(user, gettoken = null): Observable<any>{
  if(gettoken != null){
    user.gettoken = gettoken;
  }
  let params = JSON.stringify(user);
  let headers = new HttpHeaders().set('Content-Type', 'application/json');

  return this._http.post(this.url+'login', params, {headers: headers});
}

getIdentity(){
  let identity = JSON.parse(localStorage.getItem('identity'));

  if(identity != "undefined"){
    this.identity = identity;
  }else{
    this.identity = null;
  }
  return this.identity;
}

getToken(){
  let token = localStorage.getItem('token');

  if(token != "undefined"){
    this.token = token;
  }else{
    this.token = null;
  }
  return this.token;
}

}
