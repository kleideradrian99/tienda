import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Router } from "@angular/router";
import { ClienteService } from '../services/cliente.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private _clienteService: ClienteService, 
    private _router: Router
    ) {

  }

  //Proteccion de componentes con Guards dependiendo del rol
  //Pasamos el role admin por que lo tengo en la collecion
  canActivate(): any {
    //Si el metodo es falso me redirecciona al login
    if (!this._clienteService.isAutenticated()) {

      this._router.navigate(['/login']);
      return false;
    }
    return true;
  }

}
