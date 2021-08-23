import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { SelectFieldObject } from './input-select';

@Component({
  selector: 'app-input-select',
  templateUrl: './input-select.component.html',
  styleUrls: ['./input-select.component.scss']
})

export class InputSelectComponent implements OnInit {
  @Input() form: FormGroup = new FormGroup({});
  @Input() label: string = '';
  @Input() class!: string;
  @Input() controlName!: string;
  @Input() idValue!: string;
  @Input() nameValue!: string;
  @Input() isReadOnly!: boolean;
  @Input() isRequired!: boolean;
  @Input() fieldOptions!: SelectFieldObject[];
  @Input() placeholder!: string;
  @Input() error!: boolean;
  @Input() errorText!: string;
  // @Output() onclick = new EventEmitter<string>(); 
  selectedValue!: any;

  textError: string;
  formControl = new FormControl();

  constructor(private translateService: TranslateService) { }

  ngOnInit(): void {
    this.form.addControl(this.controlName, this.formControl);
    if (this.isRequired) {
      this.formControl.setValidators(Validators.required);
    }
  }

  onChangeValue() {
    this.error = (!this.form.get(this.controlName).valid) ? true : false;

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
