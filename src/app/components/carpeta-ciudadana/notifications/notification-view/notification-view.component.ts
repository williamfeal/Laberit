import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FileModel } from 'src/app/models/file.model';
import { FirmarYPresentarPopUp } from './../../includes/firmarYpresentarPopUp/firmarYpresentarPopUp.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Notification } from 'src/app/models/notification.model';
import { NotificationService } from './../../../../services/acli-service/notification.service';

@Component({
  selector: 'app-notification-view',
  templateUrl: './notification-view.component.html',
  styleUrls: ['./notification-view.component.scss']
})
export class NotificationViewComponent implements OnInit {

  public notification:Notification;
  public identificador:string;
  public estado:string;
  
  public showSpinner:boolean = false;
  
  private acuseReciboBase64:string;

  constructor(
    private notificationService:NotificationService,
    private activatedRoute:ActivatedRoute,
    private router:Router,
    private dialog:MatDialog
  ) { }

  ngOnInit(): void {
    this.showSpinner = true;
    this.identificador = this.activatedRoute.snapshot.params.id;
    this.notificationService.infoEnvio(this.activatedRoute.snapshot.params.id).subscribe(
      (data) => {
        this.estado = data.certificada === false ? 'Pendiente' : 'Notificada';
        this.notification = data.infoEnvio
        if(this.estado === 'Notificada') {
          this.acuseReciboBase64 = data.certificacion
        }
        this.showSpinner = false;
      })
  }

  public navToSign() {
    this.router.navigate(['/carpeta-del-ciudadano/sign-notification/' + this.activatedRoute.snapshot.params.id]);
  }

  public seeNotificationDoc() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = false;
    dialogConfig.disableClose = true;
    dialogConfig.width = '90%';
    dialogConfig.height = '90%';
    dialogConfig.data = { 
      base64: this.notification.documento.contenido,
      showButtons: false
    };
    
    this.dialog.open(FirmarYPresentarPopUp, dialogConfig);
  }

  public seeAcuseRecibo() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = false;
    dialogConfig.disableClose = true;
    dialogConfig.width = '90%';
    dialogConfig.height = '90%';
    dialogConfig.data = { 
      base64: this.acuseReciboBase64,
      showButtons: false
    };
    
    this.dialog.open(FirmarYPresentarPopUp, dialogConfig);
  }

}
