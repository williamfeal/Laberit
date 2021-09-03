import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'app-accesibility',
    templateUrl: 'accesibility.component.html'
})

export class AccesibilityComponent implements OnInit {

    title: string;
    texts:string;

    enviar: boolean;

    constructor(public translate: TranslateService) {

    }

    ngOnInit() {
        this.translate.stream('accesibility').subscribe((texts: any) => {
            this.title = texts.title;
            this.texts = texts;
            this.enviar = true;
        })
    }
}