import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { SelectFieldObject } from 'src/app/shared/form/fields/input-select/input-select';
import { businessType, siNo } from 'src/app/utils/constants/app-constants';

@Component({
  selector: 'app-contact-data',
  templateUrl: './contact-data.component.html'
})
export class ContactDataComponent implements OnInit {

  @Input() formContactData:FormGroup;
  @Input() readOnly:boolean;
  @Input() interesado: boolean;
  public isChecked: boolean;
  public showInputs: boolean;
  public businessType: SelectFieldObject[];
   public siNo: SelectFieldObject[];
  constructor() { }

  ngOnInit(): void {
    this.businessType = businessType;
    this.siNo = siNo;
  }
changeInput(event: string, name: string){
  if(event === 'A' && name === 'interesado'){
    this.showInputs = true;
  }else{
    this.showInputs = false;
  }
}
}
