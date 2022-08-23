import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { global } from "./global";

@Injectable({
  providedIn: 'root'
})
export class CuponService {

  public url;

  constructor(private _http: HttpClient) {
    this.url = global.url;
  }

  registro_cupon_admin(data: any, token: any): Observable<any> {
    let headers = new HttpHeaders({ 'Content-type': 'application/json', 'Authorization': token });
    return this._http.post(this.url + 'registro_cupon_admin', data, { headers: headers });
  }

  listar_cupones_admin(filtro: any, token: any): Observable<any> {
    let headers = new HttpHeaders({ 'Content-type': 'application/json', 'Authorization': token });
    return this._http.get(this.url + 'listar_cupones_admin/' + filtro, { headers: headers });
  }

}
