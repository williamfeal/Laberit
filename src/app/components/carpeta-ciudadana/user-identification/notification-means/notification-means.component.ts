import {
  ChangeDetectorRef,
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges
  } from '@angular/core';
import { EMAIL_REGEX, selectMeans } from 'src/app/utils/constants/app-constants';
import { FormGroup } from '@angular/forms';
import { SelectFieldObject } from 'src/app/shared/form/fields/input-select/input-select';

@Component({
  selector: 'app-notification-means',
  templateUrl: './notification-means.component.html'
})
export class NotificationMeansComponent implements OnInit, OnChanges {

  @Input() formNotificationMeans: FormGroup;
  @Input() readOnly: boolean;
  @Input() public emailError: boolean;
  @Input() public emailErrorText: string;
  @Input() draft:any;

  @Input() public notificationError: boolean;
  @Input() public notificationErrorText: string;
  @Input() public validate:boolean = false;
  
  public selectMeans: SelectFieldObject[];
  public select;
  public draftNotificationMeansData;
  constructor(
    private ref: ChangeDetectorRef,
  ) { }

  ngOnInit(): void {
    this.selectMeans = selectMeans;
  }

  ngOnChanges(changes:SimpleChanges) {
    if(changes.draft && this.draft) {
      this.draftNotificationMeansData = this.draft.notification_means;
    }
    this.ref.detectChanges();
  }

  capturarCampo(value) {
    this.select = value;
    this.notificationError = false;
  }

  capturarCorreo(ev) {
    if (ev.match(EMAIL_REGEX) == null ) {
      this.emailError = true;
    } else {
      this.emailError = false;
    }
  }

}
