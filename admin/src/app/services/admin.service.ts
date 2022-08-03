import { Injectable } from '@angular/core';
import { global } from "./global";
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  public url;

  constructor(private _http: HttpClient) {
    this.url = global.url;
  }

  login_admin(data: any):Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this._http.post(this.url+'login_admin', data, { headers: headers });
  }

  getToken(){
    return localStorage.getItem('token');
  }

}
