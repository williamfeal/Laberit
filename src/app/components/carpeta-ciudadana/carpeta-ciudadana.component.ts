import { Component, OnInit } from '@angular/core';
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

  ) {
    this.url_carpeta = environment.carpeta_url + '/index';
  }

  ngOnInit(): void {

  }

  public getClave() {
    window.location.href = UrlConstants.URL_REDIRECT_CLAVE;
  }

}
