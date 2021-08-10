import { Component, OnInit } from '@angular/core';
import { UserCertificado } from 'src/app/models/user-certificate.model';
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
    
  }

}
