import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

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

  constructor(public translate: TranslateService) {
    this.translate.stream('electronic-services.valide').subscribe((texts: any) => {
      this.text = texts.text;
      this.title = texts.title;
      this.button = texts.button;
      this.enviar = true;
    });
  }
  ngOnInit(): void {
  }

}
