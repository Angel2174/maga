import { Injectable} from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { GLOBAL } from './global';
import { Pssede } from '../models/pssede';

@Injectable()
export class PssedeService{
public url:string;

//public identity;
//public token;

constructor(private _http: HttpClient){

  this.url = GLOBAL.url;
}
addPssede(token, pssede):Observable<any>{
  let params = JSON.stringify(pssede);
  let headers = new HttpHeaders().set('Content-Type', 'application/json')
                                  .set('Authorization',token);

return this._http.post(this.url+'planificacion_semanal_sede',params, {headers: headers});

}
getPssedes(token, page = 1):Observable<any>{
  let headers = new HttpHeaders().set('Content-Type', 'application/json')
                                  .set('Authorization',token);
  return this._http.get(this.url+'planificacion_semanal_sedes/'+page, {headers: headers});
}
}
