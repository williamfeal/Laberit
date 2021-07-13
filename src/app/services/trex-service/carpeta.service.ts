import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarpetaService {

  constructor() { }

  public isAuthenticated() {
    return sessionStorage.getItem('dni') !== null;
  }

  public getLoggedUser() {
    let user = {
      dni : sessionStorage.getItem('dni'),
      nombre : sessionStorage.getItem('nombre'),
      apellido1 : sessionStorage.getItem('apellido1'),
      apellido2 : sessionStorage.getItem('apellido2')
    }
    return of(user);
  }
}
