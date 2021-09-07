import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { SelectFieldObject } from 'src/app/shared/form/fields/input-select/input-select';
import { businessType, siNo, genero, typeStreet, provincias, comunidades, paises } from 'src/app/utils/constants/app-constants';

@Component({
  selector: 'app-contact-data',
  templateUrl: './contact-data.component.html',
  styleUrls: ['./contact-data.component.scss']
})
export class ContactDataComponent implements OnInit {

  @Input() formContactData: FormGroup;
  @Input() readOnly: boolean;
  @Input() interesado: boolean;
  @Input() validate: boolean;
  public errorCharacterLeng: string = 'empty_error';
  public errorNif: string = 'nif_error';
  public isChecked: boolean;
  public showInputs: boolean = true;

  //se cambiara con los catalogos
  public provincias: SelectFieldObject[] = provincias;
  public municipios: SelectFieldObject[] = comunidades;
  public paises: SelectFieldObject[] = paises;
  
  public businessType: SelectFieldObject[];
  public siNo: SelectFieldObject[];
  public selectInfo:SelectFieldObject[] = genero;
  typeStreet = typeStreet;
  constructor() { }

  ngOnInit(): void {
    this.businessType = businessType;
    this.siNo = siNo;
  }
  changeInput(event: string) {
    if (event === 'A') {
      this.showInputs = false;
    } else {
      this.showInputs = true;
    }
  }
}
