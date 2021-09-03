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
  errorNif: string = 'nif_error';
  public type = 'natural-person';
  public personType: SelectFieldObject[];
  public businessType: SelectFieldObject[];
  public siNo: SelectFieldObject[];

  public selectInfo: SelectFieldObject[] = genero;
  public paises: SelectFieldObject[] = paises;

  businessTypeSelected;
  isAutonum: boolean = false;
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
      this.isAutonum = true;
    } else {
      this.businessType = businessTypeWithoutAutonomo;
      this.isAutonum = false;
    }

  }
  businessTypeChange(event: string) {
    this.businessTypeSelected = event;
    if (this.businessTypeSelected == 1) {
      this.isAutonum = true;
    } else {
      this.isAutonum = false;
    }
  }
}
