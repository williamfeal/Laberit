import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AppUtils } from 'src/app/utils/app-utils';
import { base64 } from 'src/app/utils/constants/app-constants';
import { FirmarYPresentarPopUp } from '../firmarYpresentarPopUp/firmarYpresentarPopUp.component';

@Component({
  selector: 'app-presentar-solicitud',
  templateUrl: './presentar-solicitud.component.html',
  styleUrls: ['./presentar-solicitud.component.scss']
})
export class PresentarSolicitudComponent implements OnInit {

  public documentBase64 = '';
  constructor(public appUtils: AppUtils,
              public dialog: MatDialog,
              private router: Router,
              ) { }

  ngOnInit(): void {
  }

  // singAndPresent() {
  //   this.appUtils.signDocument(base64).then((documentSinged) => {
  //     console.log('documentSinged :>> ', documentSinged);
  //   });
  // }
  reviewDoc() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = false;
    dialogConfig.disableClose = true;
    dialogConfig.width = '90%';
    dialogConfig.height = '90%';
    dialogConfig.data = { base64: base64 };
    const dialogRef = this.dialog.open(FirmarYPresentarPopUp , dialogConfig);
  }

}
