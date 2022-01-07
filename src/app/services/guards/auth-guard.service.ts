import { CanActivate, Router } from '@angular/router';
import { CarpetaService } from '../acli-service/carpeta.service';
import { CarpetaUtils } from 'src/app/utils/carpeta-utils';
import { Injectable } from '@angular/core';

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
