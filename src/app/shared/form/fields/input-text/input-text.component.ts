import {
  Component,
  Input,
  OnInit,
  SimpleChanges
  } from '@angular/core';
import { EMAIL_REGEX } from 'src/app/utils/constants/app-constants';
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
  @Input() isMail:boolean = false;
  @Input() errorText!: string;
  @Input() value: string = "";
  @Input() placeholder!: string;
  @Input() error!: boolean;
  @Input() minLength!: number | null;
  @Input() draft;

  private unsubscribe$ = new Subject<void>();
  
  public textError: string;
  
  private formControl = new FormControl('');
  private validaciones: ValidatorFn[] = [];

  constructor(
    private translateService: TranslateService
  ) { }

  emailValidator(control: FormControl) { 
    return control.value.match(EMAIL_REGEX) == null ?  { incorrectEmail : true } : null;
  }

  ngOnInit(): void {
    this.setValidaciones();
    this.form.addControl(this.controlName, this.formControl);
    if (this.placeholder == undefined) this.placeholder = '';
  }

  private setValidaciones() {
    if (this.isRequired) {
      this.validaciones.push(Validators.required);
      if(this.isMail) this.validaciones.push(this.emailValidator);
    }

    if (this.minLength != null) {
      this.validaciones.push(Validators.minLength(this.minLength));
    }
    
    this.formControl.setValidators(this.validaciones);
  }

  onChangeValue() {
    this.error = !this.form.get(this.controlName).valid ?  true : false;
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
      this.setValidaciones();
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

