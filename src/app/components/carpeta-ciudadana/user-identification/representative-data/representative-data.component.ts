import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-representative-data',
  templateUrl: './representative-data.component.html'
})
export class RepresentativeDataComponent implements OnInit {

  @Input() formRepresentativeData:FormGroup;
  @Input() readOnly:boolean;
  
  public type = 'natural-person';

  constructor() { }

  ngOnInit(): void {
  }

  isEmpresa() {
    return this.type === 'artifitial-person';
  }

}
