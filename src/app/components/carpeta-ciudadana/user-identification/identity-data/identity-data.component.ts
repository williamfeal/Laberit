import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Tercero } from 'src/app/models/tercero.model';
import { User } from 'src/app/models/user.model';
import { CarpetaService } from 'src/app/services/trex-service/carpeta.service';

@Component({
  selector: 'app-identity-data',
  templateUrl: './identity-data.component.html'
})
export class IdentityDataComponent {

  @Input() formIdentityData:FormGroup;
  @Input() readOnly:boolean;
  @Input() user:Tercero;

  constructor(
    private ref: ChangeDetectorRef,
    private carpetaService: CarpetaService) { }

  ngOnInit(): void {
    this.carpetaService.getLoggedUser().subscribe(
      data => this.user = data
    )
  }

  ngOnChanges() {
    this.ref.detectChanges();
  }

}
