import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Draft } from 'src/app/models/draft.model';
import { CarpetaService } from 'src/app/services/trex-service/carpeta.service';

@Component({
  selector: 'app-requests-list',
  templateUrl: './requests-list.component.html',
  styleUrls: ['./requests-list.component.scss']
})
export class RequestsListComponent implements OnInit {

  public drafts:Draft[];

  constructor(
    private carpetaService:CarpetaService,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.carpetaService.getDrafts().subscribe(
      (data:Draft[]) => this.drafts = data
    )
  }

  public navToRequestDraft(draft:Draft) {
    const info = JSON.parse(draft.info);
    this.router.navigate(['/carpeta-del-ciudadano/transact/' + info.idProcedure ], {
      queryParams: { draft: draft.key}
    })
  }

}
