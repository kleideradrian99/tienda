import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { global } from "./global";

@Injectable({
  providedIn: 'root'
})
export class DescuentoService {
  public url;

  constructor(private _http: HttpClient) {
    this.url = global.url;
  }

  listar_descuentos_admin(filtro: any, token: any): Observable<any> {
    let headers = new HttpHeaders({ 'Content-type': 'application/json', 'Authorization': token });
    return this._http.get(this.url + 'listar_descuentos_admin/' + filtro, { headers: headers });
  }

  eliminar_descuento_admin(id: any, token: any): Observable<any> {
    let headers = new HttpHeaders({ 'Content-type': 'application/json', 'Authorization': token });
    return this._http.delete(this.url + 'eliminar_descuento_admin/' + id, { headers: headers });
  }

  registro_descuento_admin(token: any, data: any, file: any): Observable<any> {
    let headers = new HttpHeaders({ 'Authorization': token });

    const fb = new FormData();
    fb.append('titulo', data.titulo);
    fb.append('descuento', data.descuento);
    fb.append('fecha_inicio', data.fecha_inicio);
    fb.append('fecha_fin', data.fecha_fin);
    fb.append('banner', file);

    return this._http.post(this.url + 'registro_descuento_admin/', fb, { headers: headers });
  }
}
