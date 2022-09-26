import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { global } from "./global";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GuestService {
  public url;

  constructor(private _http: HttpClient) {
    this.url = global.url;
  }

  obtener_producto_slug_publico(slug: any): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.get(this.url + 'obtener_producto_slug_publico/' + slug, { headers: headers });
  }
}
