import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UrlConstants } from 'src/app/utils/constants/url-constants';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-carpeta-ciudadana',
  templateUrl: './carpeta-ciudadana.component.html',
  styleUrls: ['./carpeta-ciudadana.component.scss']
})
export class CarpetaCiudadanaComponent implements OnInit {

  url_carpeta;

  constructor(
    private router:Router,
    private activatedRoute:ActivatedRoute
  ) {
    this.url_carpeta = environment.carpeta_url + '/index';
  }

  ngOnInit(): void {

  }

  public getClave() {
    sessionStorage.setItem('dni', '32715798');
    sessionStorage.setItem('nombre', 'Sabela');
    sessionStorage.setItem('apellido1', 'Yáñez');
    sessionStorage.setItem('apellido2', 'López');

    console.log(this.activatedRoute.snapshot.params)
    if(this.activatedRoute.snapshot.params.idProcedure) {
      this.router.navigate(['carpeta-del-ciudadano/identificacion']);
    } else {
      this.router.navigate(['carpeta-del-ciudadano/requests-list']);
    }
  }

}
