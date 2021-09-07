import { Component, OnInit } from '@angular/core';
import { ProceduresService } from 'src/app/services/moges-services/procedures.service';

@Component({
  selector: 'app-confirmacion-solicitud',
  templateUrl: './confirmacion-solicitud.component.html',
  styleUrls: ['./confirmacion-solicitud.component.scss']
})
export class ConfirmacionSolicitudComponent implements OnInit {

  procedure;
  constructor(private procedureService: ProceduresService) {

    this.procedureService.getProcedureById(sessionStorage.getItem('idProcedure')).subscribe(
      data => this.procedure = data
    )
   }

  ngOnInit(): void {

  }
    
}
