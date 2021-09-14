import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { UrlConstants } from 'src/app/utils/constants/url-constants';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CatalogsService {
  private URL_API_CATALOGS = environment.catalogs_url + UrlConstants.ENDPOINT_CONCEPTS;
  private URL_GET_CONCEPT_BY_CODE = this.URL_API_CATALOGS + UrlConstants.ENDPOINT_GET_CONCEPT_BY_CODE;
  private URL_GET_CATALOG_BY_CODE = this.URL_API_CATALOGS + UrlConstants.ENDPOINT_GET_CATALOG_BY_CODE;

  constructor(
    private http:HttpClient
  ) { }

  public getCatalogByCode(code:string) {
    const data = this.http.get(`${this.URL_GET_CATALOG_BY_CODE}/${code}/${localStorage.getItem('lang')}`, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    });
    return data.pipe(map((response:any) => {
      return response.data;
    })).pipe(catchError((err: Error) => {
      console.error('Error obteniendo el concepto', err);
        throw err;
    }));   
  }

  public getConceptByCode(code:string) {
    const data = this.http.get(`${this.URL_GET_CONCEPT_BY_CODE}/${code}`, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    });
    return data.pipe(map((response:any) => {
      return response.data;
    })).pipe(catchError((err: Error) => {
      console.error('Error obteniendo el concepto', err);
        throw err;
    }));   
  }
}
