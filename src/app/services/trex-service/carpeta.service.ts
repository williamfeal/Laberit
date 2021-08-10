import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
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
  private URL_REFRESH_TOKEN = environment.atencion_cliente_url + UrlConstants.API_SUFFIX + UrlConstants.ENDPOINT_REFRESH_TOKEN;
  private URL_SEND_FIRMA =  environment.atencion_cliente_url + UrlConstants.API_SUFFIX + UrlConstants.ENDPOINT_USER_LOGIN;
  ;

  
  constructor(
    private http: HttpClient
  ) { }

  
  public getLoggedUser():Observable<UserCertificado> {
    const loggedUser = this.http.get(this.URL_GET_LOGGED_USER, {headers: {useInterceptor:"true"} });
    return loggedUser.pipe(map((response:UserCertificado) => {
      return response;
    })).pipe(catchError((err: HttpErrorResponse) => {
      console.error(AppConstants.ERROR_LOAD_LOGGED_USER, err);
      throw err;
    }));
  }

  public refreshToken():Observable<TokenModel> {
    const refreshToken = this.http.get(this.URL_REFRESH_TOKEN,{
      headers: new HttpHeaders({ useInterceptor: 'true' }) });
    return refreshToken.pipe(map((response:TokenModel) => {
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

  public sendFirma(firma): Observable<any> {
    const obs = this.http.post<any>(this.URL_SEND_FIRMA, firma);
    return obs.pipe(map((resp: any) => {
        return resp;
    })).pipe(catchError((err: Error) => {
        throw err;
    }));
}

  
}
