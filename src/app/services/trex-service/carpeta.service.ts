import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CarpetaService {

  constructor() { }

  public isAuthenticated() {
    return true;
  }
}
