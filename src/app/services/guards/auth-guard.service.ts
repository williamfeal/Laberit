import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { CarpetaService } from '../trex-service/carpeta.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(public carpetaService: CarpetaService, public router: Router) {}

  canActivate(): boolean {
    if (!this.carpetaService.isAuthenticated()) {
      return false;
    }
    return true;
  }
}
