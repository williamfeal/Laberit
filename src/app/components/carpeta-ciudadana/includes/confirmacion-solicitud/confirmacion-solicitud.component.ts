import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ProceduresService } from 'src/app/services/moges-services/procedures.service';
import { FirmarYPresentarPopUp } from '../firmarYpresentarPopUp/firmarYpresentarPopUp.component';

@Component({
  selector: 'app-confirmacion-solicitud',
  templateUrl: './confirmacion-solicitud.component.html',
  styleUrls: ['./confirmacion-solicitud.component.scss']
})
export class ConfirmacionSolicitudComponent implements OnInit {
  base64Request: string;
  base64Resum: string;
  public data64: boolean = false;

  procedure;
  public tokenValido: string;
  private unsubscribe$ = new Subject<void>();
  
  constructor(private procedureService: ProceduresService,
    public dialog: MatDialog,
    ) {
    
    this.procedureService.getProcedureById(sessionStorage.getItem('idProcedure')).pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe(
      data => this.procedure = data
    )
   }

  ngOnInit(): void {
    
    this.procedureService.getToken().subscribe((data)=>{
      this.getRequest(data.accessToken);
      this.getResum(data.accessToken);
    })
  
  }
  getRequest(token){
    this.procedureService.getRequest(localStorage.getItem("draftId"), token).subscribe((data)=>{
      this.data64 = true;
      this.base64Request = data;
    })
  }
  getResum(token){
    this.procedureService.getResum(localStorage.getItem("draftId"), token).subscribe((data)=>{
      this.base64Resum = data;
    })
  }
  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
    viewDoc(docBase64: string){
      const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = false;
    dialogConfig.disableClose = true;
    dialogConfig.width = '90%';
    dialogConfig.height = '90%';
    dialogConfig.data = {
      base64: docBase64,
      showButtons: false 
    };
    const dialogRef = this.dialog.open(FirmarYPresentarPopUp , dialogConfig);
    }
}
