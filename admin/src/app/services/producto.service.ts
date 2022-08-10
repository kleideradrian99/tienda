import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { global } from "./global";


@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  public url;

  constructor(private _http: HttpClient) {
    this.url = global.url;
  }

  registro_producto_admin(token: any, data: any, file: any): Observable<any> {
    let headers = new HttpHeaders({ 'Authorization': token });

    const fb = new FormData();
    fb.append('titulo', data.titulo);
    fb.append('stock', data.stock);
    fb.append('precio', data.precio);
    fb.append('categoria', data.categoria);
    fb.append('descripcion', data.descripcion);
    fb.append('contenido', data.contenido);
    fb.append('portada', file);

    return this._http.post(this.url + 'registro_producto_admin/', fb, { headers: headers });
  }

}
