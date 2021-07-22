import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-interested-data',
  templateUrl: './interested-data.component.html'
})
export class InterestedDataComponent implements OnInit {

  @Input() formInterestedData:FormGroup;
  @Input() readOnly:boolean;

  constructor() { }

  ngOnInit(): void {
  }

}
