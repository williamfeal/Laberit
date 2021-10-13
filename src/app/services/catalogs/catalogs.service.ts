import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UrlConstants } from 'src/app/utils/constants/url-constants';

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
        'Authorization': 'Basic ' + btoa('admin:admin')
      }),
    });
    return data.pipe(map((response:any) => {
      return response.data;
    })).pipe(catchError((err: Error) => {
      console.error('Error obteniendo el concepto', err);
        throw err;
    }));   
  }
  public pruebaGet(){
    const data = this.http.get('http://alfresco.apc.alfatecsistemas.es/alfresco/api/-default-/public/alfresco/versions/1/nodes/4a2841cb-24e1-4f09-be86-81037dcfb816/content?attachment=true' , {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + btoa('admin:admin')
      }),
    })
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
