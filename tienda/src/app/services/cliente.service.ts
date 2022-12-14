import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { global } from "./global";
import { Observable } from 'rxjs';
import { JwtHelperService } from "@auth0/angular-jwt";

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  public url;

  constructor(private _http: HttpClient) {
    this.url = global.url;
  }

  login_cliente(data: any): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.post(this.url + 'login_cliente', data, { headers: headers });
  }

  obtener_cliente_guest(id: any, token: any): Observable<any> {
    let headers = new HttpHeaders({ 'Content-type': 'application/json', 'Authorization': token });
    return this._http.get(this.url + 'obtener_cliente_guest/' + id, { headers: headers });
  }

  actuaizar_perfil_cliente_guest(id: any, data: any, token: any): Observable<any> {
    let headers = new HttpHeaders({ 'Content-type': 'application/json', 'Authorization': token });
    return this._http.put(this.url + 'actuaizar_perfil_cliente_guest/' + id, data, { headers: headers });
  }

  //Revisar si hay un token y lo autentique
  public isAutenticated(): boolean {

    //Vericando si hay token
    const token = localStorage.getItem('token');

    //Validacion
    if (!token) {
      return false;
    }

    //Validando si el token es valido o no
    try {
      const helper = new JwtHelperService();
      var decodedToken = helper.decodeToken(token + "");
      // console.log(decodedToken);

      if (helper.isTokenExpired(token)) {
        localStorage.clear();
        return false;

      }

      if (!decodedToken) {
        localStorage.clear();
        return false;
      }
    } catch (error) {
      localStorage.clear();
      return false;
    }
    return true;
  }

  obtener_config_public(): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.get(this.url + 'obtener_config_public', { headers: headers });
  }

  listar_producto_publico(filtro: any): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.get(this.url + 'listar_producto_publico/' + filtro, { headers: headers });
  }

  agregar_carrito_cliente(data: any, token: any): Observable<any> {
    let headers = new HttpHeaders({ 'Content-type': 'application/json', 'Authorization': token });
    return this._http.post(this.url + 'agregar_carrito_cliente/', data, { headers: headers });
  }

  obtener_carrito_cliente(id: any, token: any): Observable<any> {
    let headers = new HttpHeaders({ 'Content-type': 'application/json', 'Authorization': token });
    return this._http.get(this.url + 'obtener_carrito_cliente/' + id, { headers: headers });
  }

  eliminar_carrito_cliente(id: any, token: any): Observable<any> {
    let headers = new HttpHeaders({ 'Content-type': 'application/json', 'Authorization': token });
    return this._http.delete(this.url + 'eliminar_carrito_cliente/' + id, { headers: headers });
  }

  registro_direccion_cliente(data: any, token: any): Observable<any> {
    let headers = new HttpHeaders({ 'Content-type': 'application/json', 'Authorization': token });
    return this._http.post(this.url + 'registro_direccion_cliente/', data, { headers: headers });
  }

  obtener_todas_direcciones_cliente(id: any, token: any): Observable<any> {
    let headers = new HttpHeaders({ 'Content-type': 'application/json', 'Authorization': token });
    return this._http.get(this.url + 'obtener_todas_direcciones_cliente/' + id, { headers: headers });
  }

  cambiar_direccion_principal(id: any, cliente: any, token: any): Observable<any> {
    let headers = new HttpHeaders({ 'Content-type': 'application/json', 'Authorization': token });
    return this._http.put(this.url + 'cambiar_direccion_principal/' + id + '/' + cliente, { data: true }, { headers: headers });
  }

  obtener_direccion_principal(id: any, token: any): Observable<any> {
    let headers = new HttpHeaders({ 'Content-type': 'application/json', 'Authorization': token });
    return this._http.get(this.url + 'obtener_direccion_principal/' + id, { headers: headers });
  }

  registro_compra_cliente(data: any, token: any): Observable<any> {
    let headers = new HttpHeaders({ 'Content-type': 'application/json', 'Authorization': token });
    return this._http.post(this.url + 'registro_compra_cliente/', data, { headers: headers });
  }

  enviar_correo_envio_compra(id: any, token: any): Observable<any> {
    let headers = new HttpHeaders({ 'Content-type': 'application/json', 'Authorization': token });
    return this._http.get(this.url + 'enviar_correo_envio_compra/' + id, { headers: headers });
  }

  validar_cupon_cliente(cupon: any, token: any): Observable<any> {
    let headers = new HttpHeaders({ 'Content-type': 'application/json', 'Authorization': token });
    return this._http.get(this.url + 'validar_cupon_cliente/' + cupon, { headers: headers });
  }

  obtener_ordenes_cliente(id: any, token: any): Observable<any> {
    let headers = new HttpHeaders({ 'Content-type': 'application/json', 'Authorization': token });
    return this._http.get(this.url + 'obtener_ordenes_cliente/' + id, { headers: headers });
  }

  obtener_detalles_ordenes_cliente(id: any, token: any): Observable<any> {
    let headers = new HttpHeaders({ 'Content-type': 'application/json', 'Authorization': token });
    return this._http.get(this.url + 'obtener_detalles_ordenes_cliente/' + id, { headers: headers });
  }

}
