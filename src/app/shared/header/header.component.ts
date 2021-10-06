import { Component, Input, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
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
  private unsubscribe$ = new Subject<void>();
  public currentDate = new Date();

  @Input()
  public hiddenMenu:boolean = false;

  constructor(
    private styleService:StyleService,
    ) { }

  ngOnInit(): void {
    
    this.loadHour();
    this.loadStyles();
    setInterval(this.loadHour, 1000);
  }

  private loadHour(): void {
    const currentDate = new Date();
    const minutes = (currentDate.getMinutes() < 10 ? '0' : '') + currentDate.getMinutes();
    this.currentHourHeader = currentDate.getHours() + ':' + minutes + 'h';
    document.getElementById("horas").innerHTML = this.currentHourHeader;

  }

  private loadStyles() {
    this.styleService.getStyles().pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe(
      data => {
        document.documentElement.style.setProperty('--primary-color', data.primaryColor);
        document.documentElement.style.setProperty('--button-edit-color', data.buttonEditColor);
        document.documentElement.style.setProperty('--font-family', data.fontFamily);
        this.src_logo = data.logo;
     });
  }
  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
