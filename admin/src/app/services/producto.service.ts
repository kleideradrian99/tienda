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

  listar_producto_admin(_filtro: any, token: any): Observable<any> {
    let headers = new HttpHeaders({ 'Content-type': 'application/json', 'Authorization': token });
    return this._http.get(this.url + 'listar_producto_admin/' + _filtro, { headers: headers });
  }

  obtener_producto_admin(id: any, token: any): Observable<any> {
    let headers = new HttpHeaders({ 'Content-type': 'application/json', 'Authorization': token });
    return this._http.get(this.url + 'obtener_producto_admin/' + id, { headers: headers });
  }

  actualizar_producto_admin(token: any, data: any, id: any): Observable<any> {
    if (data.portada) {
      let headers = new HttpHeaders({ 'Authorization': token });

      const fb = new FormData();
      fb.append('titulo', data.titulo);
      fb.append('stock', data.stock);
      fb.append('precio', data.precio);
      fb.append('categoria', data.categoria);
      fb.append('descripcion', data.descripcion);
      fb.append('contenido', data.contenido);
      fb.append('portada', data.portada);

      return this._http.put(this.url + 'actualizar_producto_admin/' + id, fb, { headers: headers });
    } else {
      let headers = new HttpHeaders({ 'Content-type': 'application/json', 'Authorization': token });
      return this._http.put(this.url + 'actualizar_producto_admin/' + id, data, { headers: headers });

    }
  }

  eliminar_producto_admin(id: any, token: any): Observable<any> {
    let headers = new HttpHeaders({ 'Content-type': 'application/json', 'Authorization': token });
    return this._http.delete(this.url + 'eliminar_producto_admin/' + id, { headers: headers });
  }


  //Servicio Listar Inventario
  listar_inventario_admin(id: any, token: any): Observable<any> {
    let headers = new HttpHeaders({ 'Content-type': 'application/json', 'Authorization': token });
    return this._http.get(this.url + 'listar_inventario_admin/' + id, { headers: headers });
  }

  eliminar_inventario_admin(id: any, token: any): Observable<any> {
    let headers = new HttpHeaders({ 'Content-type': 'application/json', 'Authorization': token });
    return this._http.delete(this.url + 'eliminar_inventario_admin/' + id, { headers: headers });
  }

  registro_inventario_producto_admin(data: any, token: any): Observable<any> {
    let headers = new HttpHeaders({ 'Content-type': 'application/json', 'Authorization': token });
    return this._http.post(this.url + 'registro_inventario_producto_admin/', data, { headers: headers });
  }

  actualizar_producto_variedades_admin(token: any, id: any, data: any): Observable<any> {
    let headers = new HttpHeaders({ 'Content-type': 'application/json', 'Authorization': token });
    return this._http.put(this.url + 'actualizar_producto_variedades_admin/' + id, data, { headers: headers });
  }

  agregar_imagen_galeria_admin(token: any, data: any, id: any): Observable<any> {
    let headers = new HttpHeaders({ 'Authorization': token });

    const fb = new FormData();
    fb.append('_id', data._id);
    fb.append('imagen', data.imagen);

    return this._http.put(this.url + 'agregar_imagen_galeria_admin/' + id, fb, { headers: headers });
  }

  eliminar_imagen_galeria_admin(id: any, token: any, data: any): Observable<any> {
    let headers = new HttpHeaders({ 'Content-type': 'application/json', 'Authorization': token });
    return this._http.put(this.url + 'eliminar_imagen_galeria_admin/' + id, data, { headers: headers });
  }

}
