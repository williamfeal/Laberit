import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { TokenModel } from 'src/app/models/token.model';
import { UserCertificado } from 'src/app/models/user-certificate.model';
import { AppConstants } from 'src/app/utils/constants/app-constants';
import { UrlConstants } from 'src/app/utils/constants/url-constants';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CarpetaService {

  private URL_GET_LOGGED_USER = environment.atencion_cliente_url + UrlConstants.API_SUFFIX + UrlConstants.ENDPOINT_LOGGED_USER;
  private URL_GET_TOKEN = environment.atencion_cliente_url + UrlConstants.API_SUFFIX + UrlConstants.ENDPOINT_USER_LOGIN;

  constructor(
    private http: HttpClient
  ) { }

  public isAuthenticated() {
    return sessionStorage.getItem('nifTitular') !== null;
  }

  public getLoggedUser(token): Observable<UserCertificado> {
    const loggedUser = this.http.get(this.URL_GET_LOGGED_USER, {
      headers: new HttpHeaders({
        'Authorization': `Bearer ` + token
      })
    });
    return loggedUser.pipe(map((response: UserCertificado) => {
      return response;
    })).pipe(catchError((err: Error) => {
      console.error(AppConstants.ERROR_LOAD_LOGGED_USER, err);
      throw err;
    }));
  }

  public getTokenUsuario(): Observable<TokenModel> {
    //TO DO
    const loggedUser = this.http.post<any>(this.URL_GET_TOKEN, 'a');
    return loggedUser.pipe(map((response: TokenModel) => {
      return response;
    })).pipe(catchError((err: Error) => {
      throw err;
    }));
  }

  public saveSession(data: UserCertificado) {
    sessionStorage.setItem('nifTitular', data.nifTitular);
    sessionStorage.setItem('nombreTitular', data.nombreTitular);
    sessionStorage.setItem('apellidosTitular', data.apellidosTitular);
    sessionStorage.setItem('email', data.email);
  }

  public getSession(): UserCertificado {
    let user = new UserCertificado();
    user.apellidosTitular = sessionStorage.getItem('apellidosTitular');
    user.nombreTitular = sessionStorage.getItem('nombreTitular');
    user.nifTitular = sessionStorage.getItem('nifTitular');
    user.email = sessionStorage.getItem('email');

    return user;
  }
}
