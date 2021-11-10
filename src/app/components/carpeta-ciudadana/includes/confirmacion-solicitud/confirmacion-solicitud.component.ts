import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ProceduresService } from 'src/app/services/moges-services/procedures.service';

@Component({
  selector: 'app-confirmacion-solicitud',
  templateUrl: './confirmacion-solicitud.component.html',
  styleUrls: ['./confirmacion-solicitud.component.scss']
})
export class ConfirmacionSolicitudComponent implements OnInit {
  base64Request: string;
  base64Resum: string;
  procedure;
  public tokenValido: string;
  private unsubscribe$ = new Subject<void>();
  constructor(private procedureService: ProceduresService) {
    
    this.procedureService.getProcedureById(sessionStorage.getItem('idProcedure')).pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe(
      data => this.procedure = data
    )
   }

  ngOnInit(): void {
    this.procedureService.getToken().subscribe((data)=>{
      console.log(data);
      this.tokenValido = data;
      this.getRequest(this.tokenValido);
      this.getResum(this.tokenValido);
    })
    
  }

  getRequest(token){
    this.procedureService.getRequest(localStorage.getItem("draftId"), token).subscribe((data)=>{
      this.base64Request = data;
    })
  }
  getResum(token){
    this.procedureService.getResum(localStorage.getItem("draftId"), token).subscribe((data)=>{
      this.base64Request = data;
    })
  }
  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
    viewDoc(docBase64: string){
      const byteArray = new Uint8Array(atob(docBase64).split('').map(char => char.charCodeAt(0)));
      const byte = new Blob([byteArray], { type: 'application/pdf' });
      const urlPdf = URL.createObjectURL(byte);
      window.open(urlPdf, '_blank');
    }
}
