import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-input-number',
  templateUrl: './input-number.component.html',
  styleUrls: ['./input-number.component.scss']
})
export class InputNumberComponent implements OnInit {

  @Input() form: FormGroup = new FormGroup({});
  @Input() label: string = '';
  @Input() controlName!: string;
  @Input() idValue!: string;
  @Input() nameValue!: string;
  @Input() isReadOnly!: boolean;
  @Input() isRequired!: boolean;
  @Input() errorText!: string;
  @Input() value!: string;
  @Input() placeholder: string = "0";
  @Input() error!: boolean;
  @Input() minLength!: number | null;
  @Input() maxLength!: number | null;
  @Input() decimales!: number | null; //numero de decimales
  @Input() step!: number | null; //numero de decimales
  @Input() negativos: boolean;
  textError: string;
  validaciones: ValidatorFn[] = [];
  formControl = new FormControl('');

  constructor(private translateService: TranslateService) { }

  ngOnInit(): void {
    if (this.isRequired) {
      this.validaciones.push(Validators.required);
    }
    if (this.minLength != null) {
      this.validaciones.push(Validators.minLength(this.minLength));
    }
    if(this.negativos){
      this.validaciones.push(Validators.min(0));
      console.log('Entra en 0');
    }
    if (this.validaciones.length > 0) {
      this.formControl.setValidators(this.validaciones);
    }
    
    this.form.addControl(this.controlName, this.formControl);

    this.value ?
      this.form.get(this.controlName)?.setValue(this.value) : this.form.get(this.controlName)?.setValue('');

    if (this.placeholder == undefined) this.placeholder = '';


  }

  onChangeValue() {
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
