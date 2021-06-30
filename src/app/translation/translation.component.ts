import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LanguagesService } from '../services/moges-services/language.service';

@Component({
  selector: 'app-translation',
  templateUrl: './translation.component.html'
})
export class TranslationComponent implements OnInit {

  private activeLang = 'es';
  languages;
  constructor(
    public translate: TranslateService,
    private languagesService: LanguagesService
  ) {
    this.translate.setDefaultLang(this.activeLang);
    this.languagesService.getLanguages().subscribe((lang: any) => {
      this.languages = lang;
      this.languages.forEach(element => {
        translate.addLangs([element.code]);
      });
    })
  }

  ngOnInit() {
    this.cambiarLenguaje('es');
  }

  public cambiarLenguaje(lang) {
    this.activeLang = lang;
    this.translate.use(lang);
  }
}