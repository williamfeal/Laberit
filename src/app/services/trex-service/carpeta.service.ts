import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Tercero } from 'src/app/models/tercero.model';

@Injectable({
  providedIn: 'root'
})
export class CarpetaService {

  constructor(
    private http:HttpClient
  ) { }

  public isAuthenticated() {
    return sessionStorage.getItem('dni') !== null;
  }

  public getLoggedUser():Observable<Object> {
    return this.http.get('http://localhost:8082/api/v1/login/getLoggedUser');
  }

  public getClave() {
    return this.http.get('http://localhost:8082/api/v1/login/getClave');
  }

  public saveSession(data:Tercero) {
    sessionStorage.setItem('dni', data.dni);
    sessionStorage.setItem('nombre', data.nombre)
    sessionStorage.setItem('apellido1', data.apellido1)
    sessionStorage.setItem('apellido2', data.apellido2)

  }
}
