import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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

  constructor(private translateService: TranslateService) { }

  ngOnInit(): void {
      let formControl = new FormControl('');
      this.form.addControl(this.controlName, formControl);
      if(this.isRequired){
          formControl.setValidators(Validators.required);
      }
  }

  onChangeValue(){
      console.log('Aquí se captura el cambio de valor del campo:'+ this.form.get(this.controlName)?.value); 
      (!this.form.get(this.controlName).valid) ? this.error = true : this.error = false;

  }
  ngOnChanges() {
    this.translateService.get('error_texts.input.'+this.errorText).subscribe(
        text => {
          this.textError = text;
        }
      )
  }
}
