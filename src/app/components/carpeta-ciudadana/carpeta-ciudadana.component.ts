import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
    sessionStorage.setItem('dni', '11111111h');
    sessionStorage.setItem('nombre', 'Test');
    sessionStorage.setItem('apellido1', 'tEST');
    sessionStorage.setItem('apellido2', 'TEst');
    if(this.activatedRoute.snapshot.params.idProcedure) {
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
