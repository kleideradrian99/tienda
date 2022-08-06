import { Injectable } from '@angular/core';
import { global } from "./global";
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  public url;

  constructor(private _http: HttpClient) {
    this.url = global.url;
  }

  listar_cliente_filtro_admin(_tipo: any, _filtro: any, token: any): Observable<any> {
    let headers = new HttpHeaders({ 'Content-type': 'application/json', 'Authorization': token });
    return this._http.get(this.url + 'listar_cliente_filtro_admin/' + _tipo + '/' + _filtro, { headers: headers });
  }

  registro_cliente_admin(token: any, data: any): Observable<any> {
    let headers = new HttpHeaders({ 'Content-type': 'application/json', 'Authorization': token });
    return this._http.post(this.url + 'registro_cliente_admin/', data, { headers: headers });
  }

}
