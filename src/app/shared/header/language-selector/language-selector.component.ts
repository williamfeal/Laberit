import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LanguagesService } from 'src/app/services/moges-services/language.service';

@Component({
    selector: 'app-language-selector',
    templateUrl: 'language-selector.component.html'
})

export class LanguageSelectorComponent implements OnInit {

    language;
    constructor(private languagesService: LanguagesService, public translate: TranslateService) {
        this.languagesService.getLanguages().subscribe((lang: any) => {
            this.language = lang;
        })
    }

    ngOnInit() { }

    changeLang(ev) {
        this.translate.use(ev.value);

    }
}