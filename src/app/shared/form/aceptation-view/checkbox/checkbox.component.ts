import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { isEmptyObject } from 'jquery';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss']
})
export class CheckboxComponent implements OnInit {

  @Input() name:string;
  @Input() form:FormGroup;
  @Input() error:boolean;
  @Input() text:string;
  @Input() isRequired:boolean;
  @Input() draft;

  private formControl = new FormControl();

  constructor() { }

  ngOnInit(): void {
    this.form.addControl(this.name, this.formControl);
    if(this.isRequired === true) 
      this.formControl.setValidators(Validators.required)
  }

  ngOnChanges(changes:SimpleChanges) {
    if(changes.draft && !isEmptyObject(this.draft) && this.draft[this.name]) {
      this.formControl.setValue(this.draft[this.name]);
    }
  }

}
