import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

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
  @Input() value!: string;
  @Input() placeholder!: string;
    
  ngOnInit(): void {
      let formControl = new FormControl('');

      if(this.isRequired){
          formControl.setValidators(Validators.required);
      }

      this.form.addControl(this.controlName, formControl);

      if(this.value){
          this.form.get(this.controlName)?.setValue(this.value);
      }
  }

  onChangeValue(){
      console.log('Aquí se captura el cambio de valor del campo:'+ this.form.get(this.controlName)?.value);
  }

}
