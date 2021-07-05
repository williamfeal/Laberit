import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LanguagesService } from 'src/app/services/moges-services/language.service';

@Component({
    selector: 'app-language-selector',
    templateUrl: 'language-selector.component.html'
})

export class LanguageSelectorComponent implements OnInit {

    public language;
    public selectedLang;

    constructor(private languagesService: LanguagesService, public translate: TranslateService) {
        this.languagesService.getLanguages().subscribe((lang: any) => {
            this.language = lang;
        })
    }

    ngOnInit() { 
        if(localStorage.getItem('lang')) {
            this.selectedLang = localStorage.getItem('lang');
            this.translate.use(localStorage.getItem('lang'));
            this.languagesService.lang.next(localStorage.getItem('lang'));
        } else {
            this.selectedLang = this.translate.defaultLang;
        }
    }

    changeLang(ev) {
        this.translate.use(ev.value);
        localStorage.setItem('lang', ev.value)
        this.languagesService.lang.next(ev.value);
    }
}