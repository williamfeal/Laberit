import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-confirmation-radio-button',
  templateUrl: './confirmation-radio-button.component.html',
  styleUrls: ['./confirmation-radio-button.component.scss']
})
export class ConfirmationRadioButtonComponent implements OnInit {

  @Input() name:string;

  constructor() { }

  ngOnInit(): void {
  }

}
