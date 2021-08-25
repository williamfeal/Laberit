import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { typeStreet } from 'src/app/utils/constants/app-constants';

@Component({
  selector: 'app-social-address',
  templateUrl: './social-address.component.html'
})
export class SocialAddressComponent implements OnInit {
  
  @Input() formSocialAdress: FormGroup;
  @Input() validate: boolean;
  @Input() isRequired: boolean;

  errorCharacterLeng: string = 'empty_error';
  typeStreet = typeStreet;
  constructor() { }

  ngOnInit(): void {
  }

}
