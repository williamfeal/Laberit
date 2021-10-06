import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
    selector: 'app-how-electronic-certificate',
    templateUrl: 'how-electronic-certificate.component.html'
})

export class HowElectronicCertificateComponent implements OnInit {

    title: string;
    texts:string;

    enviar: boolean;
    private unsubscribe$ = new Subject<void>();
    constructor(public translate: TranslateService) {

    }

    ngOnInit() {
        this.translate.get('how_electronic').pipe(
            takeUntil(this.unsubscribe$)
        ).subscribe((texts: any) => {
            this.title = texts.title;
            this.texts = texts;
            this.enviar = true;
        })
    }
    ngOnDestroy(): void {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }
}