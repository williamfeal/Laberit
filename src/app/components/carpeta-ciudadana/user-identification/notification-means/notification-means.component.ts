import { ChangeDetectorRef, Component, Input, OnChanges, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { SelectFieldObject } from 'src/app/shared/form/fields/input-select/input-select';

@Component({
  selector: 'app-notification-means',
  templateUrl: './notification-means.component.html'
})
export class NotificationMeansComponent implements OnInit, OnChanges {

  @Input() formNotificationMeans:FormGroup;
  @Input() readOnly:boolean;
  
  public selectMeans:SelectFieldObject[];

  constructor(    
    private ref: ChangeDetectorRef
    ) { }

  ngOnInit(): void {
    this.selectMeans = [{
      id: '1',
      val: 'Electrónico',
      selected: true
    }, {
      id: '2',
      val: 'Papel',
      selected: false
    }]
  }
  
  ngOnChanges() {
    this.ref.detectChanges();
  }

}
