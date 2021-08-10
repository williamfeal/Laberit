import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TokenModel } from 'src/app/models/token.model';
import { UserCertificado } from 'src/app/models/user-certificate.model';
import { MockUpService } from 'src/app/services/mock-service/mockUp.service';
import { CarpetaService } from 'src/app/services/trex-service/carpeta.service';
import { AppUtils } from 'src/app/utils/app-utils';
import { CarpetaUtils } from 'src/app/utils/carpeta-utils';
import { UrlConstants } from 'src/app/utils/constants/url-constants';

@Component({
  selector: 'app-carpeta-ciudadana',
  templateUrl: './carpeta-ciudadana.component.html',
  styleUrls: ['./carpeta-ciudadana.component.scss']
})
export class CarpetaCiudadanaComponent implements OnInit {

  public url_clave: string;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public appUtils: AppUtils,
    public mockUpService: MockUpService,
    private carpetaService:CarpetaService,
    private carpetaUtils:CarpetaUtils
      ) {
    
  }

  ngOnInit(): void {
    this.url_clave = UrlConstants.URL_REDIRECT_CLAVE + window.location.href;
    if(this.activatedRoute.snapshot.queryParams.token) {
      localStorage.setItem('token_user',this.activatedRoute.snapshot.queryParams.token );
      this.loadData();
    }
    else if( localStorage.getItem('token_user') && localStorage.getItem('token_user') !== "undefined") {
      this.loadData();
    } 
  }

  private loadData() {
    this.carpetaService.getLoggedUser().subscribe(
      (data: UserCertificado) => {
        if (data !== null) {
          this.carpetaUtils.saveSession(data);
          this.nextPage();
        }
      });
  }

  public getCertificado() {
    sessionStorage.setItem("b64Certificate", null);
    this.appUtils.getSign().then((firma) => {
      const listener = setInterval(() => {
        if (sessionStorage.getItem("b64Certificate") != 'null') {
          clearInterval(listener);
          this.carpetaService.sendFirma(firma).subscribe(
            data => {
              localStorage.setItem('token_user',data.accessToken);
              this.loadData();
            });
        }
      }, 500);
    })
  }

  private nextPage() {
    if (this.activatedRoute.snapshot.params.idProcedure) {
      this.router.navigate([UrlConstants.VIEW_USER_IDENTIFICATION], {
        queryParams: {
          idProcedure: this.activatedRoute.snapshot.params.idProcedure
        }
      });
    } else {
      this.router.navigate([UrlConstants.VIEW_REQUEST_LIST]);
    }
  }
}
