import { CarpetaService } from 'src/app/services/acli-service/carpeta.service';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnChanges,
  OnInit
  } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { SwalUtils } from 'src/app/utils/swal-utils';

@Component({
    selector: 'app-poder-representacion',
    templateUrl: './poder-representacion.component.html',
    styleUrls: ['./poder-representacion.component.scss']
})
export class PoderRepresentacionComponent implements OnInit, OnChanges {
    @Input() formRepresentativePower: FormGroup;
    @Input() formRepresentativeData:FormGroup;
    @Input() validate: boolean;
    @Input() draft:any;
    @Input() isRequired: boolean;
    @Input() readOnly: boolean;

    errorCharacterLeng: string = 'empty_error';
    public type = 'interested'; 

    constructor(    
      private carpetaService:CarpetaService,
      private cdr:ChangeDetectorRef
    ) { }

    ngOnInit(): void { }

    ngOnChanges():void {
      this.cdr.detectChanges();
    }
    
    public showRepresentaBtn():boolean {
      return sessionStorage.getItem('nifTitular') !== this.formRepresentativeData.value.represented_data_nif;
    }
  
  
  public callRepresenta() {
    this.carpetaService.canRepresentativeProcedure(this.formRepresentativePower.value.represented_data_nif, sessionStorage.getItem('nifTitular')).subscribe(
      data => {
        if(data === true) {
          SwalUtils.showSuccessAlert('', 'Se ha validado el poder de representación con éxito')
        } else if( data === false) {
          SwalUtils.showErrorAlert('', 'El poder de representación no se encuentra en Representa, por favor introduzca un CIF o NIF correcto')
        } else {
          SwalUtils.showErrorAlert('', 'Ha habido un error interno. Si el error persiste, contacte con el administrador.')
        }
      });
  }
}
