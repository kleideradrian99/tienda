import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AdminService } from "src/app/services/admin.service";
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private _adminService: AdminService, private _router: Router) {

  }

  //Proteccion de componentes con Guards dependiendo del rol
  //Pasamos el role admin por que lo tengo en la collecion
  canActivate(): any {
    //Si el metodo es falso me redirecciona al login
    if (!this._adminService.isAutenticated(['admin'])) {

      this._router.navigate(['/login']);
      return false;
    }
    return true;
  }

}
