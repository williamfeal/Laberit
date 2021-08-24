import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { SelectFieldObject } from 'src/app/shared/form/fields/input-select/input-select';
import { businessType, siNo, genero } from 'src/app/utils/constants/app-constants';

@Component({
  selector: 'app-interested-data',
  templateUrl: './interested-data.component.html'
})
export class InterestedDataComponent implements OnInit {

  @Input() formInterestedData:FormGroup;
  @Input() readOnly:boolean;
  @Input() validate: boolean;
  @Input() isRequired:boolean;
  public selectInfo:SelectFieldObject[] = genero;

  errorCharacterLeng: string = 'empty_error';
   public businessType: SelectFieldObject[];
   public siNo: SelectFieldObject[];
  constructor() { }

  ngOnInit(): void {
    this.businessType = businessType;
    this.siNo = siNo;
  }

}
