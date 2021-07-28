import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { BreadcrumbService } from 'angular-crumbs';
import { UserCertificado } from 'src/app/models/user-certificate.model';
import { CarpetaService } from 'src/app/services/trex-service/carpeta.service';

@Component({
  selector: 'app-header-carpeta-ciudadana',
  templateUrl: './header-carpeta-ciudadana.component.html',
  styleUrls: ['./header-carpeta-ciudadana.component.scss']
})
export class HeaderCarpetaCiudadanaComponent implements OnInit {

  public breadcrumbs:any[];
  public user;
  
  constructor(
    private activatedRoute:ActivatedRoute,
    private translateService:TranslateService,
    private carpetaService:CarpetaService
  ) { }

  ngOnInit(): void {
    this.carpetaService.getLoggedUser().subscribe(
      (data:UserCertificado) => {
        this.user = data;
        this.carpetaService.saveSession(data);
      }
    );
    
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
