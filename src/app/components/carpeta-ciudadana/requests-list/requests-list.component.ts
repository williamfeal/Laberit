import { CarpetaService } from 'src/app/services/acli-service/carpeta.service';
import { Component, OnInit } from '@angular/core';
import { Draft } from 'src/app/models/draft.model';
import { DraftsService } from './../../../services/acli-service/drafts.service';
import { Router } from '@angular/router';
import { RequestList } from 'src/app/models/request-list.model';
import { RequestAndDraft } from 'src/app/models/request&draft.model';

@Component({
  selector: 'app-requests-list',
  templateUrl: './requests-list.component.html',
  styleUrls: ['./requests-list.component.scss']
})
export class RequestsListComponent implements OnInit {

  public drafts:Draft[];
  public requestDraft: RequestAndDraft[]=[];
  constructor(
    private carpetaService:CarpetaService,
    private router:Router,
    private draftService:DraftsService
  ) { }

  ngOnInit(): void {
    this.getRequestList();
    this.draftService.getDrafts().subscribe(
      (data:Draft[]) => {
        console.log(data);
        data.forEach(element => {
          this.requestDraft.push(
          {
            state: element.desc,
            date: element.fecha,
            interested: element.nombre,
            line: element.linea,
            product: element.producto,
            requestCode: element.key,
            info: element.info
          }
          );
        });
      }
    )
  }
  public getRequestList(){
    this.carpetaService.getRequestList().subscribe((data: any)=>{
      data.forEach(element => {
        let prod = element.tipoSol.descTipoSol.split('-');
        this.requestDraft.push(
        {
          state: element.estadoSol.estDescripcionEstado,
          date: element.solFecha,
          interested: element.solNombreSolicitante,
          line: prod[1],
          product: prod[0],
          requestCode: element.numeroAsientoReg,
        }
        );
      });
    })
  }

  public navToRequestDraft(draft:RequestAndDraft) {
    localStorage.setItem("ReadOnly", "false");
    console.log(draft);
    const info = JSON.parse(draft.info);
    sessionStorage.setItem('idProcedure', info.idProcedure);
    this.router.navigate(['/carpeta-del-ciudadano/transact/' + info.idProcedure ], {
      queryParams: { draft: draft.requestCode}
    })
  }
  public navToRequestViewDraft(draft:RequestAndDraft) {
    localStorage.setItem("ReadOnly", "true");
    const info = JSON.parse(draft.info);
    sessionStorage.setItem('idProcedure', info.idProcedure);
    this.router.navigate(['/carpeta-del-ciudadano/transact/' + info.idProcedure ], {
      queryParams: { draft: draft.requestCode}
    })
  }

}
