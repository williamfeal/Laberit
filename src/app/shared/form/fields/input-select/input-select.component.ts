import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { isEmptyObject } from 'jquery';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
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
  @Input() idSelected!: string;
  @Input() draft?:string;
  // @Output() onclick = new EventEmitter<string>(); 
  selectedValue: string = "";

  textError: string;
  formControl = new FormControl();
  private unsubscribe$ = new Subject<void>();
  constructor(private translateService: TranslateService) { }

  ngOnInit(): void {
    this.form.addControl(this.controlName, this.formControl);
    if (this.isRequired) {
      this.formControl.setValidators([Validators.required]);
    }
    if(this.placeholder){
      this.form.controls[this.controlName].setValue('');
    }
  }

  onChangeValue() {
    this.error = (!this.form.get(this.controlName).valid) ? true : false;
  }

  ngOnChanges(changes: SimpleChanges) {
    if(changes.draft && !isEmptyObject(changes.draft.currentValue)) this.selectedValue = changes.draft.currentValue[this.controlName]
    
    if (!this.isRequired) {
      if (changes.isRequired != undefined && changes.isRequired.firstChange == false) {
        this.form.get(this.controlName).clearValidators();
        this.form.get(this.controlName).updateValueAndValidity();
      }
    } else {
      this.formControl.setValidators(Validators.required);
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
