import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-representative-data',
  templateUrl: './representative-data.component.html'
})
export class RepresentativeDataComponent implements OnInit {

  public type = 'natural-person';

  constructor() { }

  ngOnInit(): void {
  }

  isEmpresa() {
    return this.type === 'artifitial-person';
  }

}
