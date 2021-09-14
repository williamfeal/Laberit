import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import * as moment from 'moment';
import { Moment } from 'moment';

@Component({
  selector: 'app-input-date',
  templateUrl: './input-date.component.html',
  styleUrls: ['./input-date.component.scss']
})
export class InputDateComponent implements OnInit {

  @Input() form: FormGroup = new FormGroup({});
  @Input() label: string = '';
  @Input() controlName!: string;
  @Input() idValue!: string;
  @Input() nameValue!: string;
  @Input() isReadOnly!: boolean;
  @Input() isRequired!: boolean;
  @Input() errorText!: string;
  @Input() value!: string;
  @Input() placeholder!: string;
  @Input() error!: boolean;
  @Input() minLength!: number | null;
  @Input() maxDate!: boolean;

  public dateToday: string;
  textError: string;
  formControl = new FormControl('');
  validaciones: ValidatorFn[] = [];
  constructor(private translateService: TranslateService) {
  }

  ngOnInit(): void {
    if (this.isRequired) {
      this.validaciones.push(Validators.required);
    }
    this.form.addControl(this.controlName, this.formControl);
    if (this.placeholder == undefined) this.placeholder = '';

    if (this.maxDate) {
      this.validationMax();
    }

  }
  validationMax() {
    let today = new Date();
    let dd = today.getDate();
    let mm = (today.getMonth() + 1).toString();
    if(mm.length == 1){
      mm = '0' + mm;
    }
    let yyyy = today.getFullYear();
    this.dateToday = yyyy + '-' + mm + '-' + dd;
    console.log(this.dateToday);
  }
  onChangeValue() {
    console.log(this.form.get(this.controlName)?.value);
    !this.form.get(this.controlName).valid ? this.error = true : this.error = false;
  }
  ngOnChanges(changes: SimpleChanges) {
    if (!this.isRequired) {
      if (changes.isRequired != undefined && changes.isRequired.firstChange == false) {
        this.form.get(this.controlName).clearValidators();
        this.form.get(this.controlName).updateValueAndValidity();
      }
    } else {
      this.formControl.setValidators(Validators.required);
      this.form.addControl(this.controlName, this.formControl);
    }
    this.translateService.get('error_texts.input.' + this.errorText).subscribe(
      text => {
        this.textError = text;
      }
    )
  }

}

