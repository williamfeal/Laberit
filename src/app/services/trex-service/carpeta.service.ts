import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Draft } from 'src/app/models/draft.model';
import { TokenModel } from 'src/app/models/token.model';
import { UserCertificado } from 'src/app/models/user-certificate.model';
import { AppConstants } from 'src/app/utils/constants/app-constants';
import { UrlConstants } from 'src/app/utils/constants/url-constants';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CarpetaService {

  private URL_GET_LOGGED_USER = environment.atencion_cliente_url + UrlConstants.API_SUFFIX + UrlConstants.ENDPOINT_LOGIN + UrlConstants.ENDPOINT_LOGGED_USER;
  private URL_GET_TOKEN = environment.atencion_cliente_url + UrlConstants.API_SUFFIX + UrlConstants.ENDPOINT_USER_LOGIN;
  private URL_REFRESH_TOKEN = environment.atencion_cliente_url + UrlConstants.API_SUFFIX + UrlConstants.ENDPOINT_REFRESH_TOKEN;
  private URL_SEND_FIRMA =  environment.atencion_cliente_url + UrlConstants.API_SUFFIX + UrlConstants.ENDPOINT_USER_LOGIN;
  private URL_DRAFT = environment.atencion_cliente_url+ UrlConstants.API_SUFFIX + UrlConstants.ENDPOINT_DRAFT;
  private headerInterceptor =  {headers: {useInterceptor:"true"} };
  constructor(
    private http: HttpClient
  ) { }
  
  public getLoggedUser():Observable<UserCertificado> {
    const loggedUser = this.http.get(this.URL_GET_LOGGED_USER, this.headerInterceptor);
    return loggedUser.pipe(map((response:UserCertificado) => {
      return response;
    })).pipe(catchError((err: HttpErrorResponse) => {
      console.error(AppConstants.ERROR_LOAD_LOGGED_USER, err);
      throw err;
    }));
  }

  public refreshToken():Observable<TokenModel> {
    const refreshToken = this.http.get(this.URL_REFRESH_TOKEN, this.headerInterceptor);
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

public saveDraft(draft:Draft) {
  const saveDraft = this.http.post<any>(this.URL_DRAFT, draft, this.headerInterceptor);
  return saveDraft.pipe(map((response: Draft) => {
    return response;
  })).pipe(catchError((err: Error) => {
    throw err;
  }));
}

public getDraft() {
  const draft = this.http.get<any>(`${this.URL_DRAFT}/${sessionStorage.getItem('nifTitular')}`, this.headerInterceptor);
  return draft.pipe(map((response: Draft[]) => {
    return response;
  })).pipe(catchError((err: Error) => {
    throw err;
  }));
} 

  
}
