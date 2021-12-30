import { AppConstants } from 'src/app/utils/constants/app-constants';
import { catchError, map } from 'rxjs/operators';
import { environment } from './../../../environments/environment';
import { FileModel } from 'src/app/models/file.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Notification } from 'src/app/models/notification.model';
import { Observable, of } from 'rxjs';
import { UrlConstants } from './../../utils/constants/url-constants';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  

  private documents:FileModel[] = [
    {
      icon: '',
      naturalName: 'Documento acuse de recibo',
      idInside: ''
    }
  ]
  
  private headerInterceptor =  {headers: {
    useInterceptor:"true",
  'Content-Type': 'application/json' 
  } };

  private URL_GET_ENVIOS = environment.atencion_cliente_url + UrlConstants.API_SUFFIX + UrlConstants.ENDPOINT_NOTIFICA_SEDE + UrlConstants.ENDPOINT_GET_ENVIOS;
  private URL_INFO_ENVIO = environment.atencion_cliente_url + UrlConstants.API_SUFFIX + UrlConstants.ENDPOINT_NOTIFICA_SEDE + UrlConstants.ENDPOINT_INFO_ENVIO; 
  private URL_GET_PLANTILLA_ACUSE = environment.atencion_cliente_url + UrlConstants.API_SUFFIX + UrlConstants.ENDPOINT_NOTIFICA_SEDE + UrlConstants.ENDPOINT_GET_PLANTILLA_ACUSE;
  private URL_CERTIFICACION_SEDE = environment.atencion_cliente_url + UrlConstants.API_SUFFIX + UrlConstants.ENDPOINT_NOTIFICA_SEDE + UrlConstants.ENDPOINT_CERTIFICACION_SEDE;

  constructor(
    private http:HttpClient
  ) { }


  public getEnvios2() {
    const envios = this.http.get(this.URL_GET_ENVIOS, this.headerInterceptor);
    return envios.pipe(map((response:any) => {
      return response.resultadoGetEnvios2.item;
    })).pipe(catchError((err: HttpErrorResponse) => {
      console.error(AppConstants.ERROR_LOAD_NOTIFICATIONS, err);
      throw err;
    }));
  }

  public infoEnvio(envioDestinatario:string) {
    const envios = this.http.post(this.URL_INFO_ENVIO, { envioDestinatario }, this.headerInterceptor);
    return envios.pipe(map((response:any) => {
      return response;
    })).pipe(catchError((err: HttpErrorResponse) => {
      console.error(AppConstants.ERROR_LOAD_INFO_ENVIO, err);
      throw err;
    }));
  }

  public getPlantillaAcuse(envioDestinatario:string) {
    const envios = this.http.post(this.URL_GET_PLANTILLA_ACUSE, { envioDestinatario }, this.headerInterceptor);
    return envios.pipe(map((response:any) => {
      return response;
    })).pipe(catchError((err: HttpErrorResponse) => {
      console.error(AppConstants.ERROR_LOAD_INFO_ENVIO, err);
      throw err;
    }));
  }

  public certificacionSede(envioDestinatario:string, documento:string) {
    const certificacion = this.http.post(this.URL_CERTIFICACION_SEDE, { envioDestinatario, documento }, this.headerInterceptor);
    return certificacion.pipe(map((response:any) => {
      return response;
    })).pipe(catchError((err: HttpErrorResponse) => {
      console.error(AppConstants.ERROR_LOAD_INFO_ENVIO, err);
      throw err;
    }));
  }
}
