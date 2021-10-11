import { ChangeDetectorRef, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { isEmptyObject } from 'jquery';

@Component({
  selector: 'app-confirmation-radio-button',
  templateUrl: './confirmation-radio-button.component.html',
  styleUrls: ['./confirmation-radio-button.component.scss']
})
export class ConfirmationRadioButtonComponent implements OnInit, OnChanges {

  @Input() name:string;
  @Input() form:FormGroup;
  @Input() error:boolean;
  @Input() isRequired:boolean;
  @Input() draft;

  value:string = ""

  private formControl = new FormControl();

  constructor(
    private cdr:ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.form.addControl(this.name, this.formControl);
    if(this.isRequired === true) 
      this.formControl.setValidators(Validators.required);
  }

  ngOnChanges(changes:SimpleChanges) {
    if(changes.draft && !isEmptyObject(this.draft) && !isEmptyObject(this.draft[this.name])) {
      this.formControl.setValue(this.draft[this.name]);
    }
  }

}
