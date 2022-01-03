import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { InfoProcedure } from 'src/app/models/info-procedure.model';
import { Procedure } from 'src/app/models/procedure.model';
import { LanguagesService } from 'src/app/services/moges-services/language.service';
import { ProceduresService } from 'src/app/services/moges-services/procedures.service';

@Component({
  selector: 'app-procedure-detail',
  templateUrl: './procedure-detail.component.html',
  styleUrls: ['./procedure-detail.component.scss']
})
export class ProcedureDetailComponent implements OnInit {

  private idProcedure: string;
  private unsubscribe$ = new Subject<void>();

  public procedure: Procedure;
  public infoProcedure: InfoProcedure;
  public action;
  
  private lang;

  public active = {
    info: '',
    online: '',
    presencial: ''
  }

  constructor(
    private activatedRoute: ActivatedRoute,
    private proceduresService: ProceduresService,
    private translate: TranslateService,
    private languageService: LanguagesService,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.idProcedure = this.activatedRoute.snapshot.params.idProcedure;
    this.activatedRoute.queryParamMap.pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe(
      queryParams => {
        this.action = queryParams.get('action');
        this.active = {
          info: '',
          online: '',
          presencial: ''
        }
        this.active[this.action] = 'show active'
        this.lang = this.translate.getBrowserLang();
        this.loadData();
      }
    );
    this.languageService.lang.pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe(
      lang => {
        this.lang = lang;
        this.loadData();
      });
  }

  private loadData() {
    this.proceduresService.getProcedureById(this.idProcedure).pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe(
      (procedure: Procedure) => {
        this.procedure = procedure;
        this.getInfoProcedure();
      })
  }

  private getInfoProcedure() {
    this.infoProcedure = this.procedure.languages.find(
      language => language.codigo === this.lang
    );
  }

  public navToTransact() {
    localStorage.setItem("ReadOnly", "false");
    sessionStorage.removeItem('idProcedure');
    sessionStorage.setItem('idProcedure',  this.procedure.id);
  }
ngOnDestroy(): void {
  this.unsubscribe$.next();
  this.unsubscribe$.complete();
}
}
