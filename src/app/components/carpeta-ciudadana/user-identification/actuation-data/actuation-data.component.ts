import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-actuation-data',
  templateUrl: './actuation-data.component.html'
})
export class ActuationDataComponent implements OnInit {

  @Input() formActuationData:FormGroup;
  @Input() readOnly:boolean;

  constructor() { }

  ngOnInit(): void {
  }

}
