import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { UrlConstants } from 'src/app/utils/constants/url-constants';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class CatalogsAfinService {
    private URL_API_CATALOGS = environment.catalogs_url + UrlConstants.ENDPOINT_CONCEPTS;
    private URL_GET_CATALOG_BY_CODE = this.URL_API_CATALOGS + UrlConstants.ENDPOINT_GET_CATALOG_BY_CODE_AND_CONCEPT;
    public httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Basic YWRtaW46YWRtaW4='
          })
    };
    constructor(private http:HttpClient){}

    public getCatalogByCodeAtConcept(namCatal1, nameCatal2){
        const data = this.http.get(`${this.URL_GET_CATALOG_BY_CODE}/${namCatal1}/${nameCatal2}/${localStorage.getItem('lang')}`, {
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
