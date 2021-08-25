import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { SelectFieldObject } from 'src/app/shared/form/fields/input-select/input-select';
import { businessType, personType, siNo, genero, paises } from 'src/app/utils/constants/app-constants';

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
  public isAutonum: string;
  public selectInfo:SelectFieldObject[] = genero;
  public paises: SelectFieldObject[] = paises;


  @Output() public typeOutput = new EventEmitter<string>();

  
  constructor() { }

  ngOnInit(): void {
    this.businessType = businessType;
    this.siNo = siNo;
    this.personType = personType;
  }
  personTypeChange(event: string) {
    console.log(event);
    this.type = event;
    this.typeOutput.emit(this.type);
  }
  autonom(event: any) {
    this.isAutonum = event.target.value;
  }
}
