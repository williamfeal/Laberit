import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TokenModel } from 'src/app/models/token.model';
import { UserCertificado } from 'src/app/models/user-certificate.model';
import { MockUpService } from 'src/app/services/mock-service/mockUp.service';
import { CarpetaService } from 'src/app/services/trex-service/carpeta.service';
import { AppUtils } from 'src/app/utils/app-utils';
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
    private carpetaService:CarpetaService
      ) {
    
  }

  ngOnInit(): void {
    this.url_clave = UrlConstants.URL_REDIRECT_CLAVE + window.location.href;
    if(this.activatedRoute.snapshot.queryParams.token) {
      localStorage.setItem('token',this.activatedRoute.snapshot.queryParams.token );
      this.loadData();
    }
  }

  private loadData() {

    this.carpetaService.getTokenUsuario().subscribe((token: TokenModel) => {
      this.carpetaService.getLoggedUser().subscribe(
        (data: UserCertificado) => {
          if (data !== null) {
            this.carpetaService.saveSession(data);
            this.nextPage();
          }
        });
    });
  }

  public getCertificado() {
    sessionStorage.setItem("b64Certificate", null);
    this.appUtils.getSign().then((firma) => {
      const listener = setInterval(() => {
        if (sessionStorage.getItem("b64Certificate") != 'null') {
          clearInterval(listener);
          this.mockUpService.sendFirma(firma).subscribe(
            data => {
              console.log('data :>> ', data);
              this.nextPage();
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
