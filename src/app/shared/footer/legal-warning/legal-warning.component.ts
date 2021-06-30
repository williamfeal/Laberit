import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'app-legal-warning',
    templateUrl: 'legal-warning.component.html'
})

export class LegalWarningComponent implements OnInit {

    title: string;
    texts:string;

    enviar: boolean;

    constructor(public translate: TranslateService) {
    }

    ngOnInit() {
        this.translate.get('legal_warning').subscribe((texts: any) => {
            this.title = texts.title;
            this.texts = texts;
            this.enviar = true;
        })
    }
}