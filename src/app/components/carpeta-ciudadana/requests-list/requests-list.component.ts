import { CarpetaService } from 'src/app/services/acli-service/carpeta.service';
import { Component, OnInit } from '@angular/core';
import { Draft } from 'src/app/models/draft.model';
import { DraftsService } from './../../../services/acli-service/drafts.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-requests-list',
  templateUrl: './requests-list.component.html',
  styleUrls: ['./requests-list.component.scss']
})
export class RequestsListComponent implements OnInit {

  public drafts:Draft[];

  constructor(
    private carpetaService:CarpetaService,
    private router:Router,
    private draftService:DraftsService
  ) { }

  ngOnInit(): void {
    this.draftService.getDrafts().subscribe(
      (data:Draft[]) => {
        this.drafts = data
      }
    )
  }

  public navToRequestDraft(draft:Draft) {
    const info = JSON.parse(draft.info);
    sessionStorage.setItem('idProcedure', info.idProcedure);
    this.router.navigate(['/carpeta-del-ciudadano/transact/' + info.idProcedure ], {
      queryParams: { draft: draft.key}
    })
  }

}
