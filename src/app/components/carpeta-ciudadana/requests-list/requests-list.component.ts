import { Component, OnInit } from '@angular/core';
import { CarpetaService } from 'src/app/services/trex-service/carpeta.service';

@Component({
  selector: 'app-requests-list',
  templateUrl: './requests-list.component.html',
  styleUrls: ['./requests-list.component.scss']
})
export class RequestsListComponent implements OnInit {

  constructor(
    private carpetaService:CarpetaService
  ) { }

  ngOnInit(): void {
    this.carpetaService.getLoggedUser().subscribe(
      (data:any) => {
        this.carpetaService.saveSession(data);
      }
    )
  }

}
