import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/moges-services/auth.service';
import { StyleService } from 'src/app/services/moges-services/style.service';
import * as DateConstants from 'src/app/utils/constants/date-constants';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public currentDateHeader = '';
  public currentHourHeader = '';
  public src_logo:string;

  private currentDate = new Date();

  constructor(
    private styleService:StyleService
    ) { }

  ngOnInit(): void {
    this.loadDate();
    this.loadHour();
    this.loadStyles();
    setInterval(this.loadHour, 1000);
  }

  private loadDate(): void {
    //TO DO: comprobar los idiomas de los textos en cuanto se creen los catalogos
    this.currentDateHeader = DateConstants.weekDays[this.currentDate.getDay() - 1] + ' ' + this.currentDate.getDate() + ' de ' +
      DateConstants.monthList[this.currentDate.getMonth()] + ' de ' + this.currentDate.getFullYear();
  }

  private loadHour(): void {
    const currentDate = new Date();
    const minutes = (currentDate.getMinutes() < 10 ? '0' : '') + currentDate.getMinutes();
    this.currentHourHeader = currentDate.getHours() + ':' + minutes + 'h';
    document.getElementById("horas").innerHTML = this.currentHourHeader;

  }

  private loadStyles() {
    this.styleService.getStyles().subscribe(
      data => {
        document.documentElement.style.setProperty('--primary-color', data.primaryColor);
        document.documentElement.style.setProperty('--button-edit-color', data.buttonEditColor);
        document.documentElement.style.setProperty('--font-family', data.fontFamily);
        this.src_logo = data.logo;
     });
  }
}
