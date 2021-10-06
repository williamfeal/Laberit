import { Component, OnInit } from '@angular/core';
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
    private carpetaService:CarpetaService
  ) { }

  ngOnInit(): void {
    this.carpetaService.getDrafts().subscribe(
      (data:Draft[]) => this.drafts = data
    )
  }

  public navToRequestDraft() {
    
  }

}
