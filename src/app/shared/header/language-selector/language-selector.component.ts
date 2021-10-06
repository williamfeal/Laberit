import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Language } from 'src/app/models/language.model';
import { LanguagesService } from 'src/app/services/moges-services/language.service';

@Component({
    selector: 'app-language-selector',
    templateUrl: 'language-selector.component.html'
})

export class LanguageSelectorComponent implements OnInit {

    public language:Language[];
    public selectedLang:string;
    private unsubscribe$ = new Subject<void>();
    constructor(private languagesService: LanguagesService, public translate: TranslateService) {
        this.languagesService.getLanguages().pipe(
            takeUntil(this.unsubscribe$)
        ).subscribe((lang: Language[]) => {
            this.language = lang;
            this.language.forEach(element => {
                translate.addLangs([element.code]);
              });
        })
    }
    ngOnInit() { 
        this.selectedLang = localStorage.getItem('lang') ? localStorage.getItem('lang') :
            this.translate.getBrowserLang() ? this.translate.getBrowserLang() : 
            this.language[0].code;
        this.translate.use(this.selectedLang);
        this.languagesService.lang.next(this.selectedLang);
        this.translate.setDefaultLang(this.selectedLang);
        localStorage.setItem('lang', this.selectedLang);
    }

    changeLang(ev) {
        this.translate.use(ev.value);
        this.languagesService.lang.next(ev.value);
        localStorage.setItem('lang', ev.value);
    }
    ngOnDestroy(): void {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }
}