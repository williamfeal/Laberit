import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Tercero } from 'src/app/models/tercero.model';
import { UserCertificado } from 'src/app/models/user-certificate.model';
import { User } from 'src/app/models/user.model';
import { CarpetaService } from 'src/app/services/trex-service/carpeta.service';

@Component({
  selector: 'app-identity-data',
  templateUrl: './identity-data.component.html'
})
export class IdentityDataComponent {

  @Input() formIdentityData:FormGroup;
  @Input() readOnly:boolean;
  @Input() user:UserCertificado;

  constructor(
    private ref: ChangeDetectorRef,
    private carpetaService: CarpetaService) { }

  ngOnInit(): void {
    // TO DO: CAMBIAR el 'a' y enviar el token del usuario 
    this.carpetaService.getLoggedUser().subscribe(
      (data:UserCertificado) => {
        this.user = data;
      });
  }

  ngOnChanges() {
    this.ref.detectChanges();
  }

}
