import { HttpClient, HttpErrorResponse, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Procedure } from 'src/app/models/procedure.model';
import { UrlConstants } from 'src/app/utils/constants/url-constants';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProceduresService {
  public httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
    })
  };
  private API_URL = environment.moges_url + UrlConstants.API_SUFFIX;
  private API_PROCEDURES_ENDPOINT = this.API_URL + UrlConstants.ENDPOINT_PROCEDURES;
  private request_URL = environment.atencion_cliente_url + UrlConstants.ENDPOINT_REQUEST;
  private resum_URL = environment.atencion_cliente_url + UrlConstants.ENDPOINT_JUSTIFICANT;
  public get_token = environment.atencion_cliente_url + UrlConstants.ENDPOINT_TOKEN_VALIDAR;
  
  lang = this.translate.currentLang;

  constructor(
    private http:HttpClient,
    private translate: TranslateService
  ) { }

  public getProcedureById(id:string) : Observable<Procedure> {
    const procedure = this.http.get(`${this.API_PROCEDURES_ENDPOINT}/${id}`, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${sessionStorage.token}`,
        'Content-Language': localStorage.getItem('lang')
      }),
    });
    return procedure.pipe(map((response:any) => {
      return response;
    })).pipe(catchError((err: Error) => {
      console.error('Error obteniendo el procedimiento', err);
        throw err;
    }));   
  }

  public getAllProcedure() : Observable<Procedure[]> {
    const procedure = this.http.get(`${this.API_PROCEDURES_ENDPOINT}`, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${sessionStorage.token}`,
        'Content-Language': localStorage.getItem('lang')
      }),
    });
    return procedure.pipe(map((response:any) => {
      return response;
    })).pipe(catchError((err: Error) => {
      console.error('Error obteniendo los procedimientos', err);
        throw err;
    }));   
  }

  public getRequest(draftId: string, token: string){
    const data = this.http.get(`${this.request_URL}${draftId}`, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
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
  public getResum(draftId: string, token: string){
    const data = this.http.get(`${this.resum_URL}${draftId}`, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
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

  public getToken(){
    const data = this.http.post(`${this.get_token}`, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${sessionStorage.token}`
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
