import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
  @Input() error!: boolean;
  @Input() errorText!: string;
  @Input() value!: string;
  @Input() placeholder!: string;

  textError: string;
  constructor(private translateService: TranslateService) { }

  ngOnInit(): void {
    let formControl = new FormControl('');

    if (this.isRequired) {
      formControl.setValidators(Validators.required);
    }

    this.form.addControl(this.controlName, formControl);

    this.value ?
      this.form.get(this.controlName)?.setValue(this.value) : this.form.get(this.controlName)?.setValue('');

    if (this.placeholder == undefined) this.placeholder = '';

    
  }

  onChangeValue() {
    console.log('Aquí se captura el cambio de valor del campo:' + this.form.get(this.controlName)?.value);
  }
  ngOnChanges() {
    this.translateService.get('error_texts.input.'+this.errorText).subscribe(
        text => {
          this.textError = text;
        }
      )
  }

}
