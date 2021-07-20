import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-requester-data',
  templateUrl: './requester-data.component.html'
})
export class RequesterDataComponent implements OnInit {

  public type = 'interested';
  @Output() public typeOutput = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

  onChangeType() {
    this.typeOutput.emit(this.type);
  }

}
