import { throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpErrorResponse,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UrlConstants } from 'src/app/utils/constants/url-constants';

@Injectable({
    providedIn: 'root'
})
export class atachService {
    private URL_API_CATALOGS = environment.catalogs_url + UrlConstants.ENDPOINT_CONCEPTS;
    private URL_GET_CONCEPT_BY_CODE = this.URL_API_CATALOGS + UrlConstants.ENDPOINT_GET_CONCEPT_BY_CODE;
    private URL_GET_CATALOG_BY_CODE = this.URL_API_CATALOGS + UrlConstants.ENDPOINT_GET_CATALOG_BY_CODE;
    private urlAlfresco = UrlConstants.URL_ALFRESCO_ATTACH_DOC;
    private urlAlfrescoDelete = UrlConstants.URL_ALFRESO_DELETE_DOC;
    public httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
          'Authorization': 'Basic YWRtaW46YWRtaW4=' 
        })
      };
      
      constructor(
        private http:HttpClient
      ){}

    public attachDocument(dataBody){
      const databodyUrl = {
            fileData: dataBody,
            autoRemane: true,
            relativePath: "/attachDocuments",
        };
        
    const data = this.http.post(`${this.urlAlfresco}`, databodyUrl , this.httpOptions);
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
    public deleteDocument(idDoc){
        const data = this.http.post(`${this.urlAlfrescoDelete}`+idDoc+'?permanent=false' , this.httpOptions);
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