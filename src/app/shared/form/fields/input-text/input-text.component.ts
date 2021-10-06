import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { isEmptyObject } from 'jquery';

@Component({
  selector: 'app-input-text',
  templateUrl: './input-text.component.html',
  styleUrls: ['./input-text.component.scss']
})
export class InputTextComponent implements OnInit {

  @Input() form: FormGroup = new FormGroup({});
  @Input() label: string = '';
  @Input() controlName!: string;
  @Input() idValue!: string;
  @Input() nameValue!: string;
  @Input() isReadOnly!: boolean;
  @Input() isRequired!: boolean;
  @Input() errorText!: string;
  @Input() value: string;
  @Input() placeholder!: string;
  @Input() error!: boolean;
  @Input() minLength!: number | null;
  @Input() draft;
  textError: string;
  formControl = new FormControl('');
  validaciones: ValidatorFn[] = [];

  constructor(private translateService: TranslateService) { }

  ngOnInit(): void {
    if (this.isRequired) {
      this.validaciones.push(Validators.required);
    }
    if (this.minLength != null) {
      this.validaciones.push(Validators.minLength(this.minLength));
    }
    if (this.validaciones.length > 0) {
      this.formControl.setValidators(this.validaciones);
    }
    this.form.addControl(this.controlName, this.formControl);

    if (this.placeholder == undefined) this.placeholder = '';
  }

  onChangeValue() {
    this.error = !this.form.get(this.controlName).valid ?  true : false;
  }
  ngOnChanges(changes: SimpleChanges) {    
    if(changes.draft && !isEmptyObject(changes.draft.currentValue[this.controlName])) 
      this.value = this.draft[this.controlName]

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

