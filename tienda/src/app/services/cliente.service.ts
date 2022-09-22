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

}
