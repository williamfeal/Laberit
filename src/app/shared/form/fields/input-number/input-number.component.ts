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
  textError: string;
  constructor(private translateService: TranslateService) { }

  ngOnInit(): void {
    let formControl = new FormControl('');
    let validaciones: ValidatorFn[] = [];
    if (this.isRequired) {
      validaciones.push(Validators.required);
    }
    if (this.minLength != null) {
      console.log(this.minLength);
      validaciones.push(Validators.minLength(this.minLength));
    }
    if(validaciones.length > 0){
      formControl.setValidators(validaciones);
    }
    this.form.addControl(this.controlName, formControl);

    this.value ?
      this.form.get(this.controlName)?.setValue(this.value) : this.form.get(this.controlName)?.setValue('');

    if (this.placeholder == undefined) this.placeholder = '';


  }

  onChangeValue() {
    !this.form.get(this.controlName).valid ? this.error = true : this.error = false;
  }
  ngOnChanges(changes: SimpleChanges) {
    //comprobar
    if (!this.isRequired) {
      this.form.get(this.controlName).clearValidators();
      this.form.get(this.controlName).updateValueAndValidity();
    }
    this.translateService.get('error_texts.input.' + this.errorText).subscribe(
      text => {
        this.textError = text;
      }
    )
  }

}
