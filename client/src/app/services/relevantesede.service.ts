import { Injectable} from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { GLOBAL } from './global';
import { Relevantesede } from '../models/relevantesede';

@Injectable()
export class RelevantesedeService{
public url:string;

//public identity;
//public token;

constructor(private _http: HttpClient){

  this.url = GLOBAL.url;
}

addRelevantesede(token, relevantesede):Observable<any>{
  let params = JSON.stringify(relevantesede);
  let headers = new HttpHeaders().set('Content-Type', 'application/json')
                                  .set('Authorization',token);

return this._http.post(this.url+'publicationsede',params, {headers: headers});

}

getRelevantesedes(token, page = 1):Observable<any>{
  let headers = new HttpHeaders().set('Content-Type', 'application/json')
                                  .set('Authorization',token);
  return this._http.get(this.url+'publicationsedess/'+page, {headers: headers});
}
}
