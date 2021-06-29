import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-contractor-profile',
  templateUrl: './contractor-profile.component.html',
  styleUrls: ['./contractor-profile.component.scss']
})
export class ContractorProfileComponent implements OnInit {

  title = '';
  text = '';
  button = '';
  link = 'https://contrataciondelestado.es/wps/poc?uri=deeplink%3AperfilContratante&idBp=4m5FtivXttEQK2TEfXGy%2BA%3D%3D';
  enviar = false;

  constructor(public translate: TranslateService) {
    this.translate.get('contractor-profile').subscribe((texts: any) => {
      this.text = texts.text;
      this.title = texts.title;
      this.button = texts.button;
      this.enviar = true;
    });
  }
  ngOnInit(): void {
  }

}
