import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-social-address',
  templateUrl: './social-address.component.html'
})
export class SocialAddressComponent implements OnInit {
  @Input() formSocialAdress: FormGroup;
  @Input() validate: boolean;
  errorCharacterLeng: string = 'empty_error';
  constructor() { }

  ngOnInit(): void {
  }

}
