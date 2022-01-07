import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

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

  private unsubscribe$ = new Subject<void>();

  constructor(public translate: TranslateService) {
    
  }

  ngOnInit(): void {
    this.translate.stream('electronic-services.electronic-invoice').pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe((texts: any) => {
      this.text = texts.text;
      this.title = texts.title;
      this.button = texts.button;
      this.enviar = true;
    })
  }
ngOnDestroy(): void {
  this.unsubscribe$.next();
  this.unsubscribe$.complete();
}
}
