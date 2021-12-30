import { ActivatedRoute, Router } from '@angular/router';
import { AppConstants } from 'src/app/utils/constants/app-constants';
import { AppUtils } from 'src/app/utils/app-utils';
import { Component, OnInit } from '@angular/core';
import { FirmarYPresentarPopUp } from './../../includes/firmarYpresentarPopUp/firmarYpresentarPopUp.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Notification } from 'src/app/models/notification.model';
import { NotificationService } from './../../../../services/acli-service/notification.service';
import { SwalUtils } from 'src/app/utils/swal-utils';

@Component({
  selector: 'app-sign-notification-receipt',
  templateUrl: './sign-notification-receipt.component.html',
  styleUrls: ['./sign-notification-receipt.component.scss']
})
export class SignNotificationReceiptComponent implements OnInit {

  private base64:string;

  constructor(
    private dialog: MatDialog,
    private appUtils:AppUtils,
    private router:Router,
    private activatedRoute:ActivatedRoute,
    private notificationService:NotificationService
  ) { }

  ngOnInit(): void {
    this.notificationService.getPlantillaAcuse(this.activatedRoute.snapshot.params.id).subscribe(
      (data) => 
        this.base64 = data.plantillaBase64)
  }
  
  public reviewDoc() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = false;
    dialogConfig.disableClose = true;
    dialogConfig.width = '90%';
    dialogConfig.height = '90%';
    dialogConfig.data = { 
      base64: this.base64,
      showButtons: false
    };
    
    this.dialog.open(FirmarYPresentarPopUp , dialogConfig);
  }

  public signReceipt() {
    const documentBase64 = "data:application/pdf;base64," + this.base64;
    try{
      this.appUtils.signDocument(documentBase64).then((documentSigned) => {
        this.notificationService.certificacionSede(this.activatedRoute.snapshot.params.id, documentSigned).subscribe(
          (data) => this.router.navigate(['carpeta-del-ciudadano/notification-view/' + data.envioDestinatarioId]))          
        });
      } catch(e){
          SwalUtils.showErrorAlert('Error', 'En la firma del documento');
      }
    }
}
