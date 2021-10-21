import { AppConstants } from 'src/app/utils/constants/app-constants';
import { FileModel } from 'src/app/models/file.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Notification } from 'src/app/models/notification.model';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private notifications:Notification[] = [{
    id: 'prueba',
    concept: 'orueba',
    state: 'prueba',
    actualization_date: new Date(),
    notification_date: new Date(),
    cif:'1234',
    organismoEmisor:'organismo emisor',
    tipoEnvio:'tipo Envio',
    fechaRecepcion: new Date(),
    numRegistro:'12345',
    fechaRegistro: new Date()
  }];

  private notification:Notification = {
    id: 'prueba',
    concept: 'orueba',
    state: 'prueba',
    actualization_date: new Date(),
    notification_date: new Date(),
    cif:'1234',
    organismoEmisor:'organismo emisor',
    tipoEnvio:'tipo Envio',
    fechaRecepcion: new Date(),
    numRegistro:'12345',
    fechaRegistro: new Date()
  }

  private documents:FileModel[] = [
    {
      icon: '',
      naturalName: 'Documento acuse de recibo',
      idInside: ''
    }
  ]
  

  constructor(
    private http:HttpClient
  ) { }

  public getNotifications():Observable<Notification[]> {
    return of(this.notifications)
  }

  public getNotificationById(id:string):Observable<Notification> {
    return of(this.notification)
  }

  public getNotificationDocuments(id:string) {
    return of(this.documents)
  }
}
