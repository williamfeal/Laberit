import { Component, OnInit } from '@angular/core';
import * as DateConstants from 'src/app/utils/constants/date-constants';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public currentDateHeader = '';
  public currentHourHeader = '';

  private currentDate = new Date();
  
  constructor() { }

  ngOnInit(): void {
    this.loadDate();
    this.loadHour();
    setInterval(this.loadHour, 1000);
  }

  private loadDate(): void {
    this.currentDateHeader = DateConstants.weekDays[this.currentDate.getDay()-1] + ' ' + this.currentDate.getDate() + ' de ' +
      DateConstants.monthList[this.currentDate.getMonth()] + ' de ' + this.currentDate.getFullYear();
  }

  private loadHour(): void {
    const currentDate = new Date();
    const minutes = (currentDate.getMinutes() < 10 ? '0' : '') + currentDate.getMinutes();
    this.currentHourHeader = currentDate.getHours() + ':' + minutes + 'h';
    document.getElementById("horas").innerHTML = this.currentHourHeader;

  }


}
