import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';

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

  textError: string;
  constructor(private translateService: TranslateService) { }

  ngOnInit(): void {
    let formControl = new FormControl('');
    let validaciones: ValidatorFn[] = [];
    if (this.isRequired) {
      validaciones.push(Validators.required);
    }
    this.form.addControl(this.controlName, formControl);
    if (this.placeholder == undefined) this.placeholder = '';


  }

  onChangeValue() {
      console.log(this.form.get(this.controlName)?.value);
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

