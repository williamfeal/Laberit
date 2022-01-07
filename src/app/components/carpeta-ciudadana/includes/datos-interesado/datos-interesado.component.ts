import { CarpetaService } from 'src/app/services/acli-service/carpeta.service';
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Tercero } from 'src/app/models/tercero.model';
import { UserCertificado } from 'src/app/models/user-certificate.model';

@Component({
  selector: 'app-datos-interesado',
  templateUrl: './datos-interesado.component.html',
  styleUrls: ['./datos-interesado.component.scss']
})
export class DatosInteresadoComponent implements OnInit {
  
  @Input() user:UserCertificado;

  @Input() readOnly:boolean;
  @Input() formdDatosInteresado:FormGroup;

  constructor(
    private carpetaService:CarpetaService
  ) { }

  ngOnInit(): void {
    // this.user = this.carpetaService.getSession();
  }
  
  isInteresado(): boolean{
    return false;
  }
}
