import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'app-technical-requirements',
    templateUrl: 'technical-requirements.component.html'
})

export class TechnicalRequirementsComponent implements OnInit {

    title: string;
    texts:string;

    enviar: boolean;

    constructor(public translate: TranslateService) {

    }

    ngOnInit() {
        this.translate.get('technical_requirements').subscribe((texts: any) => {
            this.title = texts.title;
            this.texts = texts;
            this.enviar = true;
        })
    }
}