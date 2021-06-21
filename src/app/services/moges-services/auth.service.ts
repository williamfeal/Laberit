import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { UrlConstants } from 'src/app/utils/constants/url-constants';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private API_URL = environment.moges_url;
  private API_TOKEN_ENDPOINT = this.API_URL + UrlConstants.ENDPOINT_TOKEN;

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json' 
    }),
  };

  constructor(
    private http: HttpClient
  ) {
   }

  public getToken():Observable<any> {
    const data = this.http.get(this.API_TOKEN_ENDPOINT, this.httpOptions);
    return data.pipe(map((response: any) => {
      return response.token;
    })).pipe(catchError((err: Error) => {
      console.error('Error obteniendo el tiempo', err);
      throw err;
    }));
  }
}
