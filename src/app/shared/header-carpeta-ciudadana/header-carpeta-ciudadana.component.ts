import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { BreadcrumbService } from 'angular-crumbs';
import { Category } from 'src/app/models/category.model';
import { InfoProcedure } from 'src/app/models/info-procedure.model';
import { Procedure } from 'src/app/models/procedure.model';
import { UserCertificado } from 'src/app/models/user-certificate.model';
import { CarpetaService } from 'src/app/services/trex-service/carpeta.service';
import { CarpetaUtils } from 'src/app/utils/carpeta-utils';

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

  constructor(
    private activatedRoute:ActivatedRoute,
    private translateService:TranslateService,
    private carpetaUtils:CarpetaUtils
  ) { }

  ngOnInit(): void {
    if(this.procedure) {
      this.infoProcedure = this.procedure.languages.find(
        language => language.codigo === localStorage.getItem('lang')
      )
    }
    this.user = this.carpetaUtils.getSession();
    this.activatedRoute.data.subscribe((d:any) => {
      this.breadcrumbs = d.breadcrumb;
      this.breadcrumbs.forEach(
        breadcrumb => {
          this.translateService.get(breadcrumb.title).subscribe(
            title => breadcrumb.title = title
          )
        });
    });
  }

}
