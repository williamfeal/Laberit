import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
  HttpRequest
  } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Procedure } from 'src/app/models/procedure.model';
import { TranslateService } from '@ngx-translate/core';
import { UrlConstants } from 'src/app/utils/constants/url-constants';

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
  public get_token = environment.atencion_cliente_url + UrlConstants.ENDPOINT_TOKEN_VALIDAR;
  private request_URL = environment.atencion_cliente_url + UrlConstants.ENDPOINT_REQUEST; // Devuelve el pdf sin firmar
  private resum_URL = environment.atencion_cliente_url + UrlConstants.ENDPOINT_JUSTIFICANT;//Devuelve el codigo del registro
  private recibo_ENDPOINT = environment.atencion_cliente_url + UrlConstants.ENDPOINT_RECIBO; //Devuelve recibo registro(resumen)
  private signedRequest_ENDPOINT =  environment.atencion_cliente_url + UrlConstants.ENDPOINT_SOLICITUD; //Devuelve solicitud firmada
  
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
  //Devuelve la solicitud firmada con el CSV
  public getSignedRequest(codeRegister: string, token){
    const data = this.http.get(`${this.signedRequest_ENDPOINT}${codeRegister}`, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      }),
      'responseType':'text'
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

  //Devuelve el recibo del registro
  public getRegisterReceipt(codeRegister: string, token){
    const data = this.http.get(`${this.recibo_ENDPOINT}${codeRegister}`, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      }),
      'responseType':'text'
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
//Devuelve el Pdf sin firmar
  public getRequest(draftId: string, token){
    const data = this.http.get(`${this.request_URL}${draftId}`, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      }),
      'responseType': 'text'
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
 //Devuelve el codigo del registro para poder sacar el justificante y el resumen de la solicitud
  public getRegisterCodec(draftId: string, token){
    const data = this.http.get(`${this.resum_URL}${draftId}`, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }),
      'responseType': 'text'
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
//Llamada para refrescar Token en la pantalla de confirmación
  public getToken(){
    const data = this.http.post(`${this.get_token}`,sessionStorage.b64Certificate, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${sessionStorage.token}`
      }),
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
