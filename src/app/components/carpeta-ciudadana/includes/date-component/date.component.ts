import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbCalendar, NgbDatepicker, NgbDateStruct  } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-date',
  templateUrl: './date.component.html',
  styleUrls: ['./date.component.scss']
})

export class DateComponent implements OnInit{
  @Input() form: FormGroup = new FormGroup({});
  @Input() nameValue!: string;
  @Input() idValue!: string;
  @Input() controlName!: string;
   
  model: NgbDateStruct;
  @ViewChild('dp') dp: NgbDatepicker;
  date: { year: number, month: number };
  constructor(private calendar: NgbCalendar) {
  }
  ngOnInit(): void {
     let formControl = new FormControl('');  
     this.form.addControl(this.controlName, formControl);
  }

  selectToday() {
    // this.controlName = this.calendar.getToday();
    console.log('Entra');
  }

  setCurrent() {
    //Current Date
    this.dp.navigateTo()
    console.log('Entra2');

  }
  setDate() {
    //Set specific date
    this.dp.navigateTo({ year: 2013, month: 2 });
    console.log('Entra3');

  }

  navigateEvent(event) {
    this.date = event.next;
    console.log('Entra4');

  }
  onChangeValue(){
    let stringDate = ""+this.model['day'].toString()+"-"+this.model['month'].toString()+"-"+this.model['year'].toString();
    this.form.controls[this.controlName].setValue(stringDate);
    console.log(this.form.get(this.controlName)?.value);
  }
}