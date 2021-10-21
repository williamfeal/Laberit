import { AppConstants } from 'src/app/utils/constants/app-constants';
import { AppUtils } from 'src/app/utils/app-utils';
import { Component, OnInit } from '@angular/core';
import { FirmarYPresentarPopUp } from './../../includes/firmarYpresentarPopUp/firmarYpresentarPopUp.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { SwalUtils } from 'src/app/utils/swal-utils';

@Component({
  selector: 'app-sign-notification-receipt',
  templateUrl: './sign-notification-receipt.component.html',
  styleUrls: ['./sign-notification-receipt.component.scss']
})
export class SignNotificationReceiptComponent implements OnInit {

  constructor(
    public dialog: MatDialog,
    public appUtils:AppUtils,
    public router:Router
  ) { }

  ngOnInit(): void {
  }
  
  public reviewDoc() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = false;
    dialogConfig.disableClose = true;
    dialogConfig.width = '90%';
    dialogConfig.height = '90%';
    dialogConfig.data = { 
      base64: AppConstants.base64,
      showButtons: false
    };
    
    const dialogRef = this.dialog.open(FirmarYPresentarPopUp , dialogConfig);
  }

  public signReceipt() {
    const documentBase64 = "data:application/pdf;base64," + AppConstants.base64;
    try{
      this.appUtils.signDocument(documentBase64).then((documentSinged) => {
          console.log('documentSinged :>> ', documentSinged);
          setInterval(() =>{
              this.router.navigate(['carpeta-del-ciudadano/notification-view/id']);
          },3000);
          
        });
      } catch(e){
          SwalUtils.showErrorAlert('Error', 'En la firma del documento');
      }
    }
}
