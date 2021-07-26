import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Tercero } from 'src/app/models/tercero.model';
import { CarpetaService } from 'src/app/services/trex-service/carpeta.service';

@Component({
  selector: 'app-instancia-general',
  templateUrl: './instancia-general.component.html',
  styleUrls: ['./instancia-general.component.scss']
})
export class InstanciaGeneralComponent implements OnInit {

  public user:Tercero;
  public formInstanciaGeneral:FormGroup = new FormGroup({});

  constructor(
    private router:Router,
    private carpetaService:CarpetaService
  ) {  }

  ngOnInit(): void { 
    this.carpetaService.getLoggedUser().subscribe(
      (data:Tercero) => {
        this.user = data;
      }
    );
  }
  
  
  public goToDocumentation() {
    this.router.navigate(['carpeta-del-ciudadano/adjuntar']);
  }
}
