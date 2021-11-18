import { throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpErrorResponse,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UrlConstants } from 'src/app/utils/constants/url-constants';

@Injectable({
  providedIn: 'root'
})
export class CatalogsService {
  private URL_API_CATALOGS = environment.catalogs_url + UrlConstants.ENDPOINT_CONCEPTS;
  private URL_GET_CONCEPT_BY_CODE = this.URL_API_CATALOGS + UrlConstants.ENDPOINT_GET_CONCEPT_BY_CODE;
  private URL_GET_CATALOG_BY_CODE = this.URL_API_CATALOGS + UrlConstants.ENDPOINT_GET_CATALOG_BY_CODE;
  private URL_GET_TEMPLATE = UrlConstants.URL_ALFRESCO_GET_TEMPLATE;
  public httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': 'Basic YWRtaW46YWRtaW4='
        })
  };
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
    })).pipe(catchError(error => {
      let errorMsg: string;
      if (error.error instanceof ErrorEvent) {
          errorMsg = `Error: ${error.error.message}`;
      } else {
          errorMsg = this.getServerErrorMessage(error);
      }
      return throwError(errorMsg);
  }));   
  }
  public prueba(code: string){
    console.log(code);
    const data = this.http.get(`${this.URL_GET_TEMPLATE}5e3fb40e-f430-422f-909f-157b066c2299/content?attachment=true`, {
      headers: new HttpHeaders({
        'Authorization': `Basic YWRtaW46YWRtaW4=`,
      }),
      'responseType': 'blob'
    });
    return data.pipe(map((response:any) => {
      return response;
    })).pipe(catchError(error => {
      let errorMsg: string;
      if (error.error instanceof ErrorEvent) {
          errorMsg = `Error: ${error.error.message}`;
      } else {
          errorMsg = this.getServerErrorMessage(error);
      }
      return throwError(errorMsg);
  }));
  }

  public getCatalogByCodePlantilla(code:string) {
    const data = this.http.get(`${this.URL_GET_CATALOG_BY_CODE}/${code}/${localStorage.getItem('lang')}`, this.httpOptions);
    return data.pipe(map((response:any) => {
      return response.data;
    })).pipe(catchError(error => {
      let errorMsg: string;
      if (error.error instanceof ErrorEvent) {
          errorMsg = `Error: ${error.error.message}`;
      } else {
          errorMsg = this.getServerErrorMessage(error);
      }
      return throwError(errorMsg);
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

  private getServerErrorMessage(error: HttpErrorResponse): string {
    switch (error.status) {
        case 404: {
            return `Not Found: ${error.message}`;
        }
        case 403: {
            return `Access Denied: ${error.message}`;
        }
        case 500: {
            return `Internal Server Error: ${error.message}`;
        }
        default: {
            return `Unknown Server Error: ${error.message}`;
        }

    }
}
}
