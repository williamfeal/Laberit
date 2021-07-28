import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Tercero } from 'src/app/models/tercero.model';
import { UserCertificado } from 'src/app/models/user-certificate.model';
import { UrlConstants } from 'src/app/utils/constants/url-constants';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CarpetaService {

  private URL_GET_LOGGED_USER = environment.atencion_cliente_url + UrlConstants.API_SUFFIX + UrlConstants.ENDPOINT_LOGIN + UrlConstants.ENDPOINT_LOGGED_USER;

  constructor(
    private http:HttpClient
  ) { }

  public isAuthenticated() {
    return sessionStorage.getItem('nifTitular') !== null;
  }

  public getLoggedUser():Observable<Object> {
    return this.http.get(this.URL_GET_LOGGED_USER);
  }

  public saveSession(data:UserCertificado) {
    sessionStorage.setItem('nifTitular', data.nifTitular);
    sessionStorage.setItem('nombreTitular', data.nombreTitular)
    sessionStorage.setItem('apellidosTitular', data.apellidosTitular)
  }
}
