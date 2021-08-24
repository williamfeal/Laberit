import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { typeStreet } from 'src/app/utils/constants/app-constants';

@Component({
  selector: 'app-legal-representative',
  templateUrl: './legal-representative.component.html',
})
export class LegalRepresentativeComponent implements OnInit {

  @Input() formLegalRepresentative: FormGroup;
  @Input() readOnly: boolean;
  @Input() isRequired: boolean;
  @Input() validate: boolean;
  errorCharacterLeng: string = 'empty_error';
  //se cambiara con los catalogos
  typeStreet = typeStreet;
  constructor() { }

  ngOnInit(): void {
  }

}
