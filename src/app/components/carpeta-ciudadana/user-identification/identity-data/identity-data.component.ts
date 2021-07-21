import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { User } from 'src/app/models/user.model';
import { CarpetaService } from 'src/app/services/trex-service/carpeta.service';

@Component({
  selector: 'app-identity-data',
  templateUrl: './identity-data.component.html'
})
export class IdentityDataComponent implements OnInit {

  @Input() formIdentityData:FormGroup;
  @Input() readOnly:boolean;

  public user:User;

  constructor(
    private ref: ChangeDetectorRef,
    private carpetaService:CarpetaService) { }

  ngOnInit(): void {
    this.carpetaService.getLoggedUser().subscribe(
      data => this.user = data 
    )
  }

  ngOnChanges() {
    this.ref.detectChanges();
  }

}
