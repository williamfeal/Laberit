import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';

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
  @Input() value!: string;
  @Input() placeholder!: string;
  @Input() error!: boolean;
  @Input() minLength!: number | null;
  textError: string;
  constructor(private translateService: TranslateService) { }

  ngOnInit(): void {
    let formControl = new FormControl('');
    let validaciones: ValidatorFn[] = [];
    if (this.isRequired) {
      validaciones.push(Validators.required);
    }
    if (this.minLength != null) {
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
  ngOnChanges() {
    this.translateService.get('error_texts.input.' + this.errorText).subscribe(
      text => {
        this.textError = text;
      }
    )
  }

}
