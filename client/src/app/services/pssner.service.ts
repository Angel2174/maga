import { Injectable} from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { GLOBAL } from './global';
import { Pssner } from '../models/pssner';

@Injectable()
export class PssnerService{
public url:string;

//public identity;
//public token;

constructor(private _http: HttpClient){

  this.url = GLOBAL.url;
}

addPssner(token, pssner):Observable<any>{
  let params = JSON.stringify(pssner);
  let headers = new HttpHeaders().set('Content-Type', 'application/json')
                                  .set('Authorization',token);

return this._http.post(this.url+'planificacion_semanal_sner',params, {headers: headers});

}
getPssners(token, page = 1):Observable<any>{
  let headers = new HttpHeaders().set('Content-Type', 'application/json')
                                  .set('Authorization',token);
  return this._http.get(this.url+'planificacion_semanal_sners/'+page, {headers: headers});
}
}
