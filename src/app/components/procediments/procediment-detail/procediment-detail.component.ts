import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { InfoProcediment } from 'src/app/models/info-procediment.model';
import { Procediment } from 'src/app/models/procediment.model';
import { LanguagesService } from 'src/app/services/moges-services/language.service';
import { ProceduresService } from 'src/app/services/moges-services/procedures.service';

@Component({
  selector: 'app-procediment-detail',
  templateUrl: './procediment-detail.component.html',
  styleUrls: ['./procediment-detail.component.scss']
})
export class ProcedimentDetailComponent implements OnInit {

  private idProcediment:string;

  public procediment:Procediment;
  public infoProcediment:InfoProcediment;
  public action;
  
  private lang = this.translate.currentLang;

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
    this.idProcediment = this.activatedRoute.snapshot.params.idProcedure;
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
        this.getInfoProcediment();
      }
    )
    this.loadData();
  }

  private loadData() {
    this.proceduresService.getProcedimentById(this.idProcediment).subscribe(
      (procediment:Procediment) => {
        this.procediment = procediment;
        this.getInfoProcediment();
      })
  }

  private getInfoProcediment() {
    this.infoProcediment = this.procediment.languages.find(
      language => language.codigo === this.lang
    );
  }

}
