import { Injectable} from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { GLOBAL } from './global';
import { Relevante } from '../models/relevante';

@Injectable()
export class RelevanteService{
public url:string;

//public identity;
//public token;

constructor(private _http: HttpClient){

  this.url = GLOBAL.url;
}

addRelevante(token, relevante):Observable<any>{
  let params = JSON.stringify(relevante);
  let headers = new HttpHeaders().set('Content-Type', 'application/json')
                                  .set('Authorization',token);

return this._http.post(this.url+'publication',params, {headers: headers});

}

getRelevantes(token, page = 1):Observable<any>{
  let headers = new HttpHeaders().set('Content-Type', 'application/json')
                                  .set('Authorization',token);
  return this._http.get(this.url+'publications/'+page, {headers: headers});
}
}
