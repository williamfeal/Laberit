import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MockUpService } from 'src/app/services/mock-service/mockUp.service';
import { AppUtils } from 'src/app/utils/app-utils';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-carpeta-ciudadana',
  templateUrl: './carpeta-ciudadana.component.html',
  styleUrls: ['./carpeta-ciudadana.component.scss']
})
export class CarpetaCiudadanaComponent implements OnInit {

  url_carpeta;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public appUtils: AppUtils,
    public mockUpService: MockUpService
  ) {
    this.url_carpeta = environment.carpeta_url + '/index';
  }

  ngOnInit(): void {

  }

  public getClave() {
    sessionStorage.setItem('dni', '11111111h');
    sessionStorage.setItem('nombre', 'Test');
    sessionStorage.setItem('apellido1', 'tEST');
    sessionStorage.setItem('apellido2', 'TEst');
    this.nextPage();
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

  nextPage() {
    if (this.activatedRoute.snapshot.params.idProcedure) {
      this.router.navigate(['carpeta-del-ciudadano/identificacion'], {
        queryParams: {
          idProcedure: this.activatedRoute.snapshot.params.idProcedure
        }
      });
    } else {
      this.router.navigate(['carpeta-del-ciudadano/requests-list']);
    }
  }
}
