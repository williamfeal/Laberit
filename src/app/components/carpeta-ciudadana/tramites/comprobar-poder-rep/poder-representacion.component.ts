import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CarpetaService } from 'src/app/services/acli-service/carpeta.service';

@Component({
    selector: 'app-poder-representacion',
    templateUrl: './poder-representacion.component.html',
    styleUrls: ['./poder-representacion.component.scss']
})
export class PoderRepresentacionComponent implements OnInit {
    @Input() formRepresentativePower: FormGroup;
    @Input() validate: boolean;
    @Input() draft:any;
    @Input() isRequired: boolean;
    @Input() readOnly: boolean;

    errorCharacterLeng: string = 'empty_error';
    public type = 'interested'; 

    constructor(    private carpetaService:CarpetaService
        ) { }

    ngOnInit(): void { }

    
  public showRepresentaBtn():boolean {
    return sessionStorage.getItem('nifTitular') !== this.formRepresentativePower.value.represented_data_nif;
  }
  
  public callRepresenta() {
    this.carpetaService.canRepresentativeProcedure(this.formRepresentativePower.value.represented_data_nif, sessionStorage.getItem('nifTitular')).subscribe(
      data => {
        console.log(data)
      }
    )
  }
}
