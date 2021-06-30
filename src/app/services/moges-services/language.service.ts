import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Procediment } from 'src/app/models/procediment.model';
import { UrlConstants } from 'src/app/utils/constants/url-constants';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LanguagesService {

  private API_URL = environment.moges_url + UrlConstants.API_SUFFIX;
  private API_LANGUAGES_ENDPOINT = this.API_URL + UrlConstants.ENDPOINT_LANGUAGES;

  constructor(
    private http:HttpClient
  ) { }

  public getLanguages() : Observable<Procediment> {
    const procedure = this.http.get(this.API_LANGUAGES_ENDPOINT, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${sessionStorage.token}`,
        'Content-Language':'es'
      }),
    });
    return procedure.pipe(map((response:any) => {
      return response;
    })).pipe(catchError((err: Error) => {
      console.error('Error obteniendo los idiomas', err);
        throw err;
    }));   
  }

}
