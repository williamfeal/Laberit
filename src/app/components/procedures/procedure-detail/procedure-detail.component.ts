import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
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

  private idProcedure:string;

  public procedure:Procedure;
  public infoProcedure:InfoProcedure;
  public action;
  
  private lang = this.translate.getBrowserLang();

  public active = {
    info: '',
    online: '',
    presencial: ''
  }

  constructor(
    private activatedRoute: ActivatedRoute,
    private proceduresService:ProceduresService,
    private translate:TranslateService,
    private languageService:LanguagesService
  ) { }

  ngOnInit(): void {
    this.idProcedure = this.activatedRoute.snapshot.params.idProcedure;
    this.activatedRoute.queryParamMap.subscribe(
      queryParams => {
        this.action = queryParams.get('action');
        this.active = {
          info: '',
          online: '',
          presencial: ''
        }
        this.active[this.action] = 'show active'
      }
    );
    this.languageService.lang.subscribe(
      lang => {
        this.lang = lang;
        this.loadData();
      }
    )
    this.loadData();
  }

  private loadData() {
    this.proceduresService.getProcedureById(this.idProcedure, this.lang).subscribe(
      (procedure:Procedure) => {
        this.procedure = procedure;
        this.getInfoProcedure();
      })
  }

  private getInfoProcedure() {
    this.infoProcedure = this.procedure.languages.find(
      language => language.codigo === this.lang
    );
  }

}
