import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { DraftsService } from 'src/app/services/acli-service/drafts.service';
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
  public dataR64: boolean = false;
  public registerCode: string;

  procedure;
  public tokenValido: string;
  private unsubscribe$ = new Subject<void>();
  
  constructor(private procedureService: ProceduresService,
    public dialog: MatDialog,
    private draftService: DraftsService
    ) {
    
    this.procedureService.getProcedureById(sessionStorage.getItem('idProcedure')).pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe(
      data => {this.procedure = data
      console.log(data)
      }
    )
   }

  ngOnInit(): void {
    console.log(localStorage.getItem("draftId"));
    this.procedureService.getToken().subscribe((data)=>{
      this.getRegisterCodec(data.accessToken);
      console.log(data);
    })
  
    this.draftService.getDraftById(localStorage.getItem("draftId")+ ':forms:formConfirmation').subscribe((data)=>{
    console.log(data);
    })
  }
  
  getRegisterCodec(token){
    this.procedureService.getRegisterCodec(localStorage.getItem("draftId"), token).subscribe((data)=>{
     this.registerCode = data;
     this.getReceipt(token);
      this.getDemand(token);
      console.log('draftId----->' + data);
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
    getReceipt(token){
      this.procedureService.getRegisterReceipt(this.registerCode, token).subscribe((data)=>{
          this.base64Request = data;
          this.dataR64=true;
      })
    }
    getDemand(token){
      this.procedureService.getSignedRequest(this.registerCode, token).subscribe((data)=>{
        this.base64Resum = data;
        this.data64=true;
      })
    }
}
