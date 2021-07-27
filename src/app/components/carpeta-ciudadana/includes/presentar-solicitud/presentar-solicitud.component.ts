import { Component, OnInit } from '@angular/core';
import { AppUtils } from 'src/app/utils/app-utils';
import { base64 } from 'src/app/utils/constants/app-constants';

@Component({
  selector: 'app-presentar-solicitud',
  templateUrl: './presentar-solicitud.component.html',
  styleUrls: ['./presentar-solicitud.component.scss']
})
export class PresentarSolicitudComponent implements OnInit {

  public documentBase64 = '';
  constructor(public appUtils: AppUtils) { }

  ngOnInit(): void {
  }

  singAndPresent() {
    this.appUtils.signDocument(base64).then((documentSinged) => {
      console.log('documentSinged :>> ', documentSinged);
    });
  }

}
