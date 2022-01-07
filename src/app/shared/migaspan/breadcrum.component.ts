import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { InfoProcedure } from 'src/app/models/info-procedure.model';
import { Procedure } from 'src/app/models/procedure.model';

@Component({
    selector: 'app-breadcrum',
    templateUrl: './breadcrum.component.html',
    styleUrls: ['./breadcrum.component.scss']
})
export class BreadcrumComponent implements OnInit {
    private unsubscribe$ = new Subject<void>();
    public breadcrumbs:any[];
    public draft;
    public infoProcedure:InfoProcedure;
    @Input() view: string;
    @Input() procedure!:Procedure;

    constructor(
        private translateService:TranslateService,
        private activatedRoute:ActivatedRoute,

        ) { }

    ngOnInit(): void { 
        this.loadData();
        this.translateService.onLangChange.subscribe
        (
          () => this.loadData()
        )
    }
    loadData(){
        if(this.procedure) {
            this.infoProcedure = this.procedure.languages.find(
              language => language.codigo === localStorage.getItem('lang')
            )
          }
        this.activatedRoute.data.pipe(
            takeUntil(this.unsubscribe$)
          ).subscribe((d:any) => {
            this.breadcrumbs = d.breadcrumb;
            console.log(this.breadcrumbs)
          });
      
          if (this.activatedRoute.snapshot.queryParams.draft) {
            this.draft = this.activatedRoute.snapshot.queryParams.draft;
          }
    }
}
