import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Tercero } from 'src/app/models/tercero.model';
import { UserCertificado } from 'src/app/models/user-certificate.model';
import { CarpetaService } from 'src/app/services/trex-service/carpeta.service';

@Component({
  selector: 'app-instancia-general',
  templateUrl: './instancia-general.component.html',
  styleUrls: ['./instancia-general.component.scss']
})
export class InstanciaGeneralComponent {

  public user:UserCertificado;
  public formInstanciaGeneral:FormGroup = new FormGroup({});

  constructor(
    private router:Router,
    private carpetaService:CarpetaService
  ) {  }


  
  
  public goToDocumentation() {
    this.router.navigate(['carpeta-del-ciudadano/adjuntar']);
  }
}
