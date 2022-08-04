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
      console.log(decodedToken);

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
}
