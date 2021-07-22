import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
  @Output() onclick = new EventEmitter<string>(); 
  selectedValue!: any;

  ngOnInit(): void {
      let formControl = new FormControl('');
      if(this.isRequired){
          formControl.setValidators(Validators.required);
      }
      this.form.addControl(this.controlName, formControl);
      this.selectedValue = this.fieldOptions.filter(fo => fo.selected)[0];
      if(this.selectedValue){
          this.form.get(this.controlName)?.setValue(this.selectedValue.id);
      } else  {
          this.form.get(this.controlName)?.setValue(0);
      }
  }

  onChangeValue(){
      console.log('Aquí se captura el cambio de valor del campo:'+ this.form.get(this.controlName)?.value);
      this.onclick.emit(this.form.get(this.controlName)?.value);
  }


}
