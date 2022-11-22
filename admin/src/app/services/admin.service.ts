import { Injectable } from '@angular/core';
import { global } from "./global";
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { JwtHelperService } from "@auth0/angular-jwt";


@Injectable({
  providedIn: 'root'
})
export class AdminService {

  public url;

  constructor(private _http: HttpClient) {
    this.url = global.url;
  }

  login_admin(data: any): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.post(this.url + 'login_admin', data, { headers: headers });
  }

  //Valindando Token
  getToken() {
    return localStorage.getItem('token');
  }

  //Revisar si hay un token y lo autentique
  public isAutenticated(allowRoles: string[]): boolean {

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
        console.log('NO ES VALIDO');
        localStorage.removeItem('token');
        return false;
      }
    } catch (error) {
      localStorage.removeItem('token');
      return false;
    }

    //Validacion para los roles
    return allowRoles.includes(decodedToken['role']);
  }

  actualizar_config_admin(id: any, data: any, token: any): Observable<any> {
    if (data.logo) {
      let headers = new HttpHeaders({ 'Authorization': token });

      const fb = new FormData();
      fb.append('titulo', data.titulo);
      fb.append('serie', data.serie);
      fb.append('correlativo', data.correlativo);
      fb.append('categorias', JSON.stringify(data.categorias));
      fb.append('logo', data.logo);

      return this._http.put(this.url + 'actualizar_config_admin/' + id, fb, { headers: headers });
    } else {
      let headers = new HttpHeaders({ 'Content-type': 'application/json', 'Authorization': token });
      return this._http.put(this.url + 'actualizar_config_admin/' + id, data, { headers: headers });
    }
  }

  obtener_config_admin(token: any): Observable<any> {
    let headers = new HttpHeaders({ 'Content-type': 'application/json', 'Authorization': token });
    return this._http.get(this.url + 'obtener_config_admin', { headers: headers });
  }

  obtener_config_public(): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.get(this.url + 'obtener_config_public', { headers: headers });
  }

  obtener_mensajes_admin(token: any): Observable<any> {
    let headers = new HttpHeaders({ 'Content-type': 'application/json', 'Authorization': token });
    return this._http.get(this.url + 'obtener_mensajes_admin', { headers: headers });
  }

  cambiar_estado_mensaje(id: any, data: any, token: any): Observable<any> {
    let headers = new HttpHeaders({ 'Content-type': 'application/json', 'Authorization': token });
    return this._http.put(this.url + 'cambiar_estado_mensaje/' + id, data, { headers: headers });
  }
}
