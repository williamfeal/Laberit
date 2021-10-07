import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { UserCertificado } from 'src/app/models/user-certificate.model';
import { CarpetaService } from 'src/app/services/trex-service/carpeta.service';

@Component({
  selector: 'app-identity-data',
  templateUrl: './identity-data.component.html'
})
export class IdentityDataComponent {

  @Input() formIdentityData:FormGroup;
  @Input() readOnly:boolean;
  @Input() user:UserCertificado;
  private unsubscribe$ = new Subject<void>();

  constructor(
    private ref: ChangeDetectorRef,
    private carpetaService: CarpetaService) { }

  ngOnInit(): void {
    this.carpetaService.getLoggedUser().pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe(
      (data:UserCertificado) => {
        this.user = data;
      });
  }

  ngOnChanges() {
    this.ref.detectChanges();
  }
  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
