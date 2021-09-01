import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-electronic-invoice',
  templateUrl: './electronic-invoice.component.html',
  styleUrls: ['./electronic-invoice.component.scss']
})
export class ElectronicInvoiceComponent implements OnInit {

  title = '';
  text = '';
  button = '';
  link = 'https://face.gob.es/es';
  enviar = false;

  constructor(public translate: TranslateService) {
    
  }

  ngOnInit(): void {
    this.translate.get('electronic-services.electronic-invoice').subscribe((texts: any) => {
      this.text = texts.text;
      this.title = texts.title;
      this.button = texts.button;
      this.enviar = true;
    })
  }

}
