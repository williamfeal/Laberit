import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { SelectFieldObject } from 'src/app/shared/form/fields/input-select/input-select';
import { businessType, siNo, genero } from 'src/app/utils/constants/app-constants';

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
  public isChecked: boolean;
  public showInputs: boolean = true;
  public businessType: SelectFieldObject[];
  public siNo: SelectFieldObject[];
  public selectInfo:SelectFieldObject[] = genero;
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
