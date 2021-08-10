import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { SelectFieldObject } from 'src/app/shared/form/fields/input-select/input-select';
import { personType } from 'src/app/utils/constants/app-constants';

@Component({
  selector: 'app-representative-data',
  templateUrl: './representative-data.component.html'
})
export class RepresentativeDataComponent implements OnInit {

  @Input() formRepresentativeData:FormGroup;
  @Input() readOnly:boolean;
  
  public type = 'natural-person';
  public personType: SelectFieldObject[];
  constructor() { }

  ngOnInit(): void {
    this.personType = personType;
  }
  personTypeChange(event: string){
    console.log(event);
    this.type = event;
   
  }
}
