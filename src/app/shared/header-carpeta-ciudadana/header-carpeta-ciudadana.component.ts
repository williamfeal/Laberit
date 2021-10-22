import { ActivatedRoute } from '@angular/router';
import { BreadcrumbService } from 'angular-crumbs';
import { CarpetaService } from 'src/app/services/acli-service/carpeta.service';
import { CarpetaUtils } from 'src/app/utils/carpeta-utils';
import { Category } from 'src/app/models/category.model';
import { Component, Input, OnInit } from '@angular/core';
import { InfoProcedure } from 'src/app/models/info-procedure.model';
import { LanguagesService } from './../../services/moges-services/language.service';
import { Procedure } from 'src/app/models/procedure.model';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import { UserCertificado } from 'src/app/models/user-certificate.model';

@Component({
  selector: 'app-header-carpeta-ciudadana',
  templateUrl: './header-carpeta-ciudadana.component.html',
  styleUrls: ['./header-carpeta-ciudadana.component.scss']
})
export class HeaderCarpetaCiudadanaComponent implements OnInit {

  public breadcrumbs:any[];
  public user;
  
  @Input() procedure!:Procedure;
  
  public infoProcedure:InfoProcedure;
  public draft;
  
  private unsubscribe$ = new Subject<void>();
  constructor(
    private activatedRoute:ActivatedRoute,
    private translateService:TranslateService,
    private carpetaUtils:CarpetaUtils
  ) { }

  ngOnInit(): void {
    this.loadData();
    this.translateService.onLangChange.subscribe
    (
      () => this.loadData()
    )
    
  }

  loadData() {
    if(this.procedure) {
      this.infoProcedure = this.procedure.languages.find(
        language => language.codigo === localStorage.getItem('lang')
      )
    }
    this.user = this.carpetaUtils.getSession();
    this.activatedRoute.data.pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe((d:any) => {
      this.breadcrumbs = d.breadcrumb;
    });

    if (this.activatedRoute.snapshot.queryParams.draft) {
      this.draft = this.activatedRoute.snapshot.queryParams.draft;
    }
     
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
