import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
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
  public formInstanciaGeneral:FormGroup;
  @Input() readOnly:boolean;

  constructor(
    private fb: FormBuilder,
    private router:Router,
    private carpetaService:CarpetaService
  ) {  
    this.newForm();
  }

  ngOnInit(): void { 
    this.carpetaService.getLoggedUser().subscribe(
      (data:Tercero) => {
        this.user = data;
      }
    );
  }
  newForm(){
    this.formInstanciaGeneral = new FormGroup({
      formdDatosInteresado: new FormGroup({}),
    });
  }

  public goToDocumentation() {
    //this.router.navigate(['carpeta-del-ciudadano/adjuntar']);
    console.log(this.formInstanciaGeneral);
    console.log(this.formInstanciaGeneral.valid);
  }
}
