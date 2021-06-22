import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit {

  title = '';
  text = '';
  button = '';
  link = 'https://contrataciondelestado.es/wps/poc?uri=deeplink%3AperfilContratante&idBp=4m5FtivXttEQK2TEfXGy%2BA%3D%3D';
  enviar = false;

  constructor(public translate: TranslateService) {
    this.translate.get('electronic-services.notifications').subscribe((texts: any) => {
      this.text = texts.text;
      this.title = texts.title;
      this.button = texts.button;
      this.enviar = true;
    });
  }

  ngOnInit(): void {

  }

}
