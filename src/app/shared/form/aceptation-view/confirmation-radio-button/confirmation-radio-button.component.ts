import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-confirmation-radio-button',
  templateUrl: './confirmation-radio-button.component.html',
  styleUrls: ['./confirmation-radio-button.component.scss']
})
export class ConfirmationRadioButtonComponent implements OnInit {

  @Input() name:string;
  @Input() form:FormGroup;
  @Input() error:boolean;
  @Input() isRequired:boolean;

  private formControl = new FormControl();

  constructor() { }

  ngOnInit(): void {
    this.form.addControl(this.name, this.formControl);
    if(this.isRequired === true) 
      this.formControl.setValidators(Validators.required)
  }

}
