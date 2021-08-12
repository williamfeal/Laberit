import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { SelectFieldObject } from 'src/app/shared/form/fields/input-select/input-select';
import { actuation } from 'src/app/utils/constants/app-constants';

@Component({
  selector: 'app-requester-data',
  templateUrl: './requester-data.component.html'
})
export class RequesterDataComponent implements OnInit {

  @Input() formRequestData: FormGroup;
  @Input() validate: boolean;
  errorCharacterLeng: string = 'num_Characters_error';
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
