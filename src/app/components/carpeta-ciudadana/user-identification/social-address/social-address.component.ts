import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { SelectFieldObject } from 'src/app/shared/form/fields/input-select/input-select';
import { provincias, typeStreet, paises, comunidades } from 'src/app/utils/constants/app-constants';

@Component({
  selector: 'app-social-address',
  templateUrl: './social-address.component.html'
})
export class SocialAddressComponent implements OnInit {

  @Input() formSocialAdress: FormGroup;
  @Input() validate: boolean;
  @Input() isRequired: boolean;

  public provincias: SelectFieldObject[] = provincias;
  public municipios: SelectFieldObject[] = comunidades;
  public paises: SelectFieldObject[] = paises;

errorCharacterLeng: string = 'empty_error';
typeStreet = typeStreet;
constructor() { }

ngOnInit(): void {
}

}
