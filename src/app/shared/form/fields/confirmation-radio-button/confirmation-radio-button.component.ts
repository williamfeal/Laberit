import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-confirmation-radio-button',
  templateUrl: './confirmation-radio-button.component.html',
  styleUrls: ['./confirmation-radio-button.component.scss']
})
export class ConfirmationRadioButtonComponent implements OnInit {

  @Input() name:string;
  @Input() form:FormGroup;
  @Input() error:boolean;

  constructor() { }

  ngOnInit(): void {

  }

}
