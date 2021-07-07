import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LanguagesService } from '../services/moges-services/language.service';

@Component({
  selector: 'app-translation',
  templateUrl: './translation.component.html'
})
export class TranslationComponent implements OnInit {

  private activeLang = this.translate.getBrowserLang() ? 
      this.translate.getBrowserLang() : 'es';
  languages;

  constructor(
    public translate: TranslateService,
    private languagesService: LanguagesService
  ) {
    this.translate.use(this.activeLang);
    this.languagesService.getLanguages().subscribe((lang: any) => {
      this.languages = lang;
      this.languages.forEach(element => {
        translate.addLangs([element.code]);
      });
    })
  }

  ngOnInit() {
    localStorage.getItem('lang') ? 
      this.cambiarLenguaje(localStorage.getItem('lang')) : this.cambiarLenguaje(this.translate.defaultLang);
    }

  public cambiarLenguaje(lang) {
    this.activeLang = lang;
    this.translate.use(lang);
  }
}