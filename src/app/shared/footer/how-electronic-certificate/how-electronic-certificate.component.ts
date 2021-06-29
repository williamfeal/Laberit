import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'app-how-electronic-certificate',
    templateUrl: 'how-electronic-certificate.component.html'
})

export class HowElectronicCertificateComponent implements OnInit {

    title: string;
    texts:string;

    enviar: boolean;

    constructor(public translate: TranslateService) {

    }

    ngOnInit() {
        this.translate.get('how_electronic').subscribe((texts: any) => {
            this.title = texts.title;
            this.texts = texts;
            this.enviar = true;
        })
    }
}