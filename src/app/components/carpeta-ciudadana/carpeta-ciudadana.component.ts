import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CarpetaService } from 'src/app/services/trex-service/carpeta.service';
import { AppConstants } from 'src/app/utils/constants/app-constants';
import { UrlConstants } from 'src/app/utils/constants/url-constants';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-carpeta-ciudadana',
  templateUrl: './carpeta-ciudadana.component.html',
  styleUrls: ['./carpeta-ciudadana.component.scss']
})
export class CarpetaCiudadanaComponent implements OnInit {

  public url_clave:string;

  constructor(
    private router:Router,
    private activatedRoute:ActivatedRoute
  ) {
    
  }

  ngOnInit(): void {
    if( this.router.url.includes(UrlConstants.VIEW_TRANSACT)) {
      this.url_clave = 
        UrlConstants.URL_REDIRECT_CLAVE + 
        UrlConstants.VIEW_USER_IDENTIFICATION + 
        '?idProcedure=' + this.activatedRoute.snapshot.params.idProcedure;
    } else {
      this.url_clave = 
        UrlConstants.URL_REDIRECT_CLAVE + 
        UrlConstants.VIEW_REQUEST_LIST;
    }
  }
  

}
