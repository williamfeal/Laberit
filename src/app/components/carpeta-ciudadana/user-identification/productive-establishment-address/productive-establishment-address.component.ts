import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { SelectFieldObject } from 'src/app/shared/form/fields/input-select/input-select';
import { provincias, typeStreet, paises, comunidades } from 'src/app/utils/constants/app-constants';


@Component({
  selector: 'app-productive-establishment-address',
  templateUrl: './productive-establishment-address.component.html'
})
export class ProductiveEstablishmentAddressComponent implements OnInit {

  @Input() formProductiveEstablishment: FormGroup;
  @Input() readOnly: boolean;
  @Input() validate: boolean = false;
  @Input() isRequired: boolean;


  public provincias: SelectFieldObject[] = provincias;
  public municipios: SelectFieldObject[] = comunidades;
  public paises: SelectFieldObject[] = paises;

  public errorCharacterLeng: string = 'empty_error';
  typeStreet = typeStreet;

  constructor() { }

  ngOnInit(): void {
  }

}
