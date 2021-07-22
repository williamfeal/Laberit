import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-contact-data',
  templateUrl: './contact-data.component.html'
})
export class ContactDataComponent implements OnInit {

  @Input() formContactData:FormGroup;
  @Input() readOnly:boolean;

  constructor() { }

  ngOnInit(): void {
  }

}
