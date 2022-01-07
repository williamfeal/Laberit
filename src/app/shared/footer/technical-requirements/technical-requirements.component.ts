import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
    selector: 'app-technical-requirements',
    templateUrl: 'technical-requirements.component.html'
})

export class TechnicalRequirementsComponent implements OnInit {

    title: string;
    texts:string;
    private unsubscribe$ = new Subject<void>();
    enviar: boolean;

    constructor(public translate: TranslateService) {

    }

    ngOnInit() {
        this.translate.stream('technical_requirements').pipe(
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