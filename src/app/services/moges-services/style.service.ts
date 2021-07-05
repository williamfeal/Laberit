import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { UrlConstants } from 'src/app/utils/constants/url-constants';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StyleService {

  private API_URL = environment.moges_url + UrlConstants.API_SUFFIX;
  private API_STYLES_ENDPOINT = this.API_URL  + UrlConstants.ENDPOINT_STYLES;


  constructor(
    private http:HttpClient
  ) { }

  public getStyles() : Observable<any> {
    const procedure = this.http.get(`${this.API_STYLES_ENDPOINT}?entity=${environment.entity_uuid}`, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${sessionStorage.token}`
      }),
    });
    return procedure.pipe(map((response:any) => {
      return response;
    })).pipe(catchError((err: Error) => {
      console.error('Error obteniendo los estilos', err);
        throw err;
    }));   
  }

}
