import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { SelectFieldObject } from 'src/app/shared/form/fields/input-select/input-select';
import { businessTypeWithoutAutonomo, personType, siNo, genero, paises, businessType } from 'src/app/utils/constants/app-constants';

@Component({
  selector: 'app-representative-data',
  templateUrl: './representative-data.component.html'
})
export class RepresentativeDataComponent implements OnInit {

  @Input() formRepresentativeData: FormGroup;
  @Input() readOnly: boolean;
  @Input() validate: boolean;
  @Input() isRequired: boolean;
  errorCharacterLeng: string = 'empty_error';
  public type = 'natural-person';
  public personType: SelectFieldObject[];
  public businessType: SelectFieldObject[];
  public siNo: SelectFieldObject[];

  public selectInfo: SelectFieldObject[] = genero;
  public paises: SelectFieldObject[] = paises;

  businessTypeSelected;
  constructor() { }

  ngOnInit(): void {
    this.businessType = businessType;
    this.siNo = siNo;
    this.personType = personType;
  }
  personTypeChange(event: string) {
    this.type = event;
    if (this.type == 'natural-person') {
      this.businessType = businessType;
    } else {
      this.businessType = businessTypeWithoutAutonomo;
    }

  }
  businessTypeChange(event: string) {
    this.businessTypeSelected = event;
  }
  
}
