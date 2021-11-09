import {
  Component,
  Input,
  OnInit,
  SimpleChanges
  } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ValidatorFn,
  Validators
  } from '@angular/forms';
import { isEmptyObject } from 'jquery';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
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
  @Input() value:number = 0;
  @Input() placeholder:number = 0;
  @Input() error!: boolean;
  @Input() minLength!: number | null;
  @Input() maxLength!: number | null;
  @Input() decimales!: number | null; //numero de decimales
  @Input() step!: number | null; //numero de decimales
  @Input() negativos: boolean;
  @Input() draft:Object;

  textError: string;
  validaciones: ValidatorFn[] = [];
  formControl = new FormControl('');
  private unsubscribe$ = new Subject<void>();
  constructor(private translateService: TranslateService) { 
   
  }

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

    if (this.placeholder == undefined) this.placeholder = 0;

  }

  onChangeValue() {
    this.error = !this.form.get(this.controlName).valid ? true : false;
    if(this.form.get(this.controlName).value < 0 ){
      this.error = true;
      this.validaciones.push(Validators.min(0));
      this.formControl.setValidators(this.validaciones);
    } else if(this.form.get(this.controlName).value === 0 && this.isRequired) {
      this.error = true;
      this.validaciones.push(Validators.min(0));
      this.formControl.setValidators(this.validaciones);
    } else{
      this.error = false;
      this.form.get(this.controlName).valid
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if(changes.draft && !isEmptyObject(this.draft) && this.draft[this.controlName] !== 0) 
      this.value = this.draft[this.controlName];  
            
    if (!this.isRequired) {
      if (changes.isRequired != undefined && changes.isRequired.firstChange == false) {
        this.form.get(this.controlName).clearValidators();
        this.form.get(this.controlName).updateValueAndValidity();
      }
    } else {
      this.formControl.setValidators(Validators.required);
      this.form.addControl(this.controlName, this.formControl);
    }

    if(this.errorText) {
      this.translateService.get('error_texts.input.' + this.errorText).pipe(
        takeUntil(this.unsubscribe$)
      ).subscribe(
        text => {
          this.textError = text;
      })
    }
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
