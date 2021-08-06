import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { SelectFieldObject } from 'src/app/shared/form/fields/input-select/input-select';
import { actuation } from 'src/app/utils/constants/app-constants';

@Component({
  selector: 'app-requester-data',
  templateUrl: './requester-data.component.html'
})
export class RequesterDataComponent implements OnInit {

  public type = 'interested'; ///ES POSIBLE QUE FALTE AÑADIR EL FORM
  public actuation: SelectFieldObject[];
  @Output() public typeOutput = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
    this.actuation = actuation;
  }

  onChangeType(event: string) {
    this.type = event;
    this.typeOutput.emit(this.type);
  }

}
