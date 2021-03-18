import { Injectable} from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { GLOBAL } from './global';
import { Follow } from '../models/follow';

@Injectable()
export class Select_empleadoService{
public url:string;


constructor(private _http: HttpClient){

  this.url = GLOBAL.url;
}

addSelect_empleado(token, follow):Observable<any>{
  let params = JSON.stringify(follow);

  let headers = new HttpHeaders().set('Content-Type', 'application/json')
                                  .set('Authorization',token);

return this._http.post(this.url+'select_empleado', params, {headers:headers});

}

deleteSelect_empleado(token, id):Observable<any>{

  let headers = new HttpHeaders().set('Content-Type', 'application/json')
                                  .set('Authorization',token);

return this._http.delete(this.url+'select_empleadod/'+id, {headers:headers});
}
}
