import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { CarpetaUtils } from 'src/app/utils/carpeta-utils';
import { CarpetaService } from '../trex-service/carpeta.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(public carpetaUtils: CarpetaUtils, public router: Router) {}

  canActivate(): boolean {
    if (!this.carpetaUtils.isAuthenticated()) {
      return false;
    }
    return true;
  }
}
