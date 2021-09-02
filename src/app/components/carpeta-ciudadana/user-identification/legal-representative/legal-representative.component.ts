import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { SelectFieldObject } from 'src/app/shared/form/fields/input-select/input-select';
import { provincias, typeStreet, paises, comunidades } from 'src/app/utils/constants/app-constants';

@Component({
  selector: 'app-legal-representative',
  templateUrl: './legal-representative.component.html',
})
export class LegalRepresentativeComponent implements OnInit {

  @Input() formLegalRepresentative: FormGroup;
  @Input() readOnly: boolean;
  @Input() isRequired: boolean;
  @Input() validate: boolean;
  errorCharacterLeng: string = 'empty_error';
  errorNif: string = 'nif_error';
  //se cambiara con los catalogos
  typeStreet = typeStreet;

  public provincias: SelectFieldObject[] = provincias;
  public municipios: SelectFieldObject[] = comunidades;
  public paises: SelectFieldObject[] = paises;
  
  constructor() { }

  ngOnInit(): void {
  }

}
