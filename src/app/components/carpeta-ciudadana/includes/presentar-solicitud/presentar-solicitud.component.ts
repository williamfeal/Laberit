import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
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

  private unsubscribe$ = new Subject<void>();
  procedure;
  public documentBase64 = '';
  constructor(public appUtils: AppUtils,
              public dialog: MatDialog,
              private router: Router,
              private procedureService: ProceduresService
              ) {
                this.procedureService.getProcedureById(sessionStorage.getItem('idProcedure')).pipe(
                  takeUntil(this.unsubscribe$)
                ).subscribe(
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
  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
