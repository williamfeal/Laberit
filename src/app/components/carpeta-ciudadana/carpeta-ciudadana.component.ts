import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-carpeta-ciudadana',
  templateUrl: './carpeta-ciudadana.component.html',
  styleUrls: ['./carpeta-ciudadana.component.scss']
})
export class CarpetaCiudadanaComponent implements OnInit {

  url_carpeta;
  iframe_carpeta;

  constructor() {
    this.url_carpeta = environment.carpeta_url + '/index';
  }

  ngOnInit(): void {
    let iframe_carpeta =  document.getElementById("iframe_carpeta");
    iframe_carpeta.setAttribute("src", this.url_carpeta)

  }

}
