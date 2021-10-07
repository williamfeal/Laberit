import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit {

  public title:string = '';
  public text:string = '';
  public button:string = '';
  public link = 'https://contrataciondelestado.es/wps/poc?uri=deeplink%3AperfilContratante&idBp=4m5FtivXttEQK2TEfXGy%2BA%3D%3D';
  public enviar = false;
  private unsubscribe$ = new Subject<void>();

  constructor(public translate: TranslateService) {
    this.translate.stream('electronic-services.notifications').pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe((texts: any) => {
      this.text = texts.text;
      this.title = texts.title;
      this.button = texts.button;
      this.enviar = true;
    });
  }

  ngOnInit(): void {

  }
ngOnDestroy(): void {
  this.unsubscribe$.next();
  this.unsubscribe$.complete();
}
}
