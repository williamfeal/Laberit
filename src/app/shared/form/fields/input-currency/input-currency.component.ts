import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { isEmptyObject } from 'jquery';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-input-currency',
  templateUrl: './input-currency.component.html',
  styles: [],
})
export class InputCurrencyComponent implements OnInit {
  @Input() form: FormGroup = new FormGroup({});
  @Input() label: string = '';
  @Input() controlName!: string;
  @Input() idValue!: string;
  @Input() nameValue!: string;
  @Input() isReadOnly!: boolean;
  @Input() isRequired!: boolean;
  @Input() errorText!: string;
  @Input() value: string;
  @Input() placeholder: string = '0';
  @Input() error!: boolean;
  @Input() minLength!: number | null;
  @Input() maxLength!: number | null;
  @Input() draft: Object;

  textError: string;
  validaciones: ValidatorFn[] = [];
  formControl = new FormControl('');
  private inputTextEmpty: boolean;
  private deleting: boolean = false;
  private unsubscribe$ = new Subject<void>();
  constructor(
    private translateService: TranslateService,
    private currencyPipe: CurrencyPipe
  ) {}

  ngOnInit(): void {
    this.setValidations();
    this.form.addControl(this.controlName, this.formControl);
    if (this.placeholder == undefined) {
      this.placeholder = '0';
    }
    this.subscriptionChangesField();
  }

  private setValidations(): void {
    if (this.isRequired) {
      this.validaciones.push(Validators.required);
    }
    if (this.minLength != null) {
      this.validaciones.push(Validators.minLength(this.minLength));
    }
    this.formControl.setValidators(this.validaciones);
  }

  validateKeyDown(event:any){
    if(event.key === 'Backspace' || event.key === 'Delete'){
      this.deleting = true;
    }else{
      this.deleting = false;
      this.transformationToValueCurrency(this.value);
    }
  }

  private subscriptionChangesField(): void {
    this.form.get(this.controlName).valueChanges.subscribe((item: any) => {
      if (item && !this.deleting) {
        this.transformationToValueCurrency(item);
      }
    });
  }

  /*
    This method transfor the text into field to currency value
  */
  private transformationToValueCurrency(value: any) {
    let texto: string = value + '';
    texto = texto.replace(/\D/g, '').replace(/^0+/, '');
    this.form.get(this.controlName).patchValue(
      new Intl.NumberFormat('es-ES', {
        style: 'currency',
        currency: 'EUR',
        minimumIntegerDigits: 1,
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(Number(texto)),
      { emitEvent: false }
    );
  }

  onChangeValue() {
    this.error = !this.form.get(this.controlName).valid ? true : false;
    this.vacio(this.formControl);
  }

  vacio(control: any){
    if ( control.value && control.value !== null && control.value.trim() === '' && this.isRequired) {
      this.inputTextEmpty = true;
      this.error = true;
      this.translateService.get('error_texts.input.empty_error').pipe(
        takeUntil(this.unsubscribe$)
      ).subscribe(
        text => {
          this.textError = text;
        }
      )
    }else{
      this. inputTextEmpty = false;
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if(changes.draft && !isEmptyObject(this.draft) && !isEmptyObject(this.draft[this.controlName])) 
      this.value = this.draft[this.controlName]

    if (!this.isRequired) {
      if (changes.isRequired != undefined && changes.isRequired.firstChange == false) {
        this.form.get(this.controlName).clearValidators();
        this.form.get(this.controlName).updateValueAndValidity();
      }
    } else {
      this.setValidations();
      this.form.addControl(this.controlName, this.formControl);
    }

    this.translateService.get('error_texts.input.' + this.errorText).pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe(
      text => {
        this.textError = text;
      }
    )
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
