import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
    selector: 'app-web-map',
    templateUrl: 'web-map.component.html'
})

export class WebMapComponent implements OnInit {

    title: string;
    texts:string;
    private unsubscribe$ = new Subject<void>();
    enviar: boolean;

    constructor(public translate: TranslateService) {
    }
    ngOnInit() { 
        this.translate.get('legal_warning').pipe(
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