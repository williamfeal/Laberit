import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-productive-establishment-address',
  templateUrl: './productive-establishment-address.component.html'
})
export class ProductiveEstablishmentAddressComponent implements OnInit {

  @Input() formProductiveEstablishment:FormGroup;
  @Input() readOnly:boolean;
  @Input() validate: boolean = false;
  public errorCharacterLeng: string = 'empty_error';

  constructor() { }

  ngOnInit(): void {
  }

}
