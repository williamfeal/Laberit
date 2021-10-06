import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-valide',
  templateUrl: './valide.component.html',
  styleUrls: ['./valide.component.scss']
})
export class ValideComponent implements OnInit {

  title = '';
  text = '';
  button = '';
  link = 'https://valide.redsara.es/valide/';
  enviar = false;

  private unsubscribe$ = new Subject<void>();

  constructor(public translate: TranslateService) {
    this.translate.stream('electronic-services.valide').pipe(
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
