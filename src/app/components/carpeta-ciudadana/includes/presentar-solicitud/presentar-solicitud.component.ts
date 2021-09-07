import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ProceduresService } from 'src/app/services/moges-services/procedures.service';
import { AppUtils } from 'src/app/utils/app-utils';
import { base64 } from 'src/app/utils/constants/app-constants';
import { FirmarYPresentarPopUp } from '../firmarYpresentarPopUp/firmarYpresentarPopUp.component';

@Component({
  selector: 'app-presentar-solicitud',
  templateUrl: './presentar-solicitud.component.html',
  styleUrls: ['./presentar-solicitud.component.scss']
})
export class PresentarSolicitudComponent implements OnInit {

  procedure;
  public documentBase64 = '';
  constructor(public appUtils: AppUtils,
              public dialog: MatDialog,
              private router: Router,
              private procedureService: ProceduresService
              ) {
                this.procedureService.getProcedureById(sessionStorage.getItem('idProcedure')).subscribe(
                  data => this.procedure = data
                )
               }

  ngOnInit(): void {
  }

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
