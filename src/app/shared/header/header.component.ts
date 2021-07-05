import { Component, OnInit } from '@angular/core';
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
  public token: boolean = false;
  public src_logo:string;

  private currentDate = new Date();

  constructor(
    private authService: AuthService,
    private styleService:StyleService
    ) { }

  ngOnInit(): void {
    this.loadDate();
    this.loadHour();
    this.loadToken();
    setInterval(this.loadHour, 1000);
    setInterval(this.loadToken, 300000);
  }

  private loadDate(): void {
    this.currentDateHeader = DateConstants.weekDays[this.currentDate.getDay() - 1] + ' ' + this.currentDate.getDate() + ' de ' +
      DateConstants.monthList[this.currentDate.getMonth()] + ' de ' + this.currentDate.getFullYear();
  }

  private loadHour(): void {
    const currentDate = new Date();
    const minutes = (currentDate.getMinutes() < 10 ? '0' : '') + currentDate.getMinutes();
    this.currentHourHeader = currentDate.getHours() + ':' + minutes + 'h';
    document.getElementById("horas").innerHTML = this.currentHourHeader;

  }

  private loadToken(): void {
    this.authService.getToken().subscribe(
      data => {
        sessionStorage.setItem('token', data);
        this.token = true;
        this.loadStyles();
      });
  }

  private loadStyles() {
    this.styleService.getStyles().subscribe(
      data => {
        document.documentElement.style.setProperty('--primary-color', data.primaryColor);
        document.documentElement.style.setProperty('--button-edit-color', data.buttonEditColor);
        this.src_logo = data.logo;
     });
  }
}
