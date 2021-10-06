import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
    selector: 'app-legal-warning',
    templateUrl: 'legal-warning.component.html'
})

export class LegalWarningComponent implements OnInit {

    title: string;
    texts:string;
    private unsubscribe$ = new Subject<void>();
    enviar: boolean;

    constructor(public translate: TranslateService) {
    }

    ngOnInit() {
        this.translate.stream('legal_warning').pipe(
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