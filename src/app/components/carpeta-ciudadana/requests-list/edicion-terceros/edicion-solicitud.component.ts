import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { UserCertificado } from 'src/app/models/user-certificate.model';
import { CarpetaService } from 'src/app/services/acli-service/carpeta.service';
import { EdicionTerceroService } from 'src/app/services/acli-service/edicion-tercero.service';
import { AppUtils } from 'src/app/utils/app-utils';

@Component({
    selector: 'app-edicion-solicitud',
    templateUrl: './edicion-solicitud.component.html',
    styleUrls: ['./edicion-solicitud.component.scss']
})
export class EdicionSolicitudComponent implements OnInit {
    @Input() formUserIdentification:FormGroup;
    private unsubscribe$ = new Subject<void>();
    public validate: boolean = false;
    public readOnlyView: boolean =false;
    public emailError = false;
    public emailErrorText: string = 'format_error';
    public notificationError = false;
    public notificationErrorText: string = 'empty_error';
    public draftUserIdentification;
    public emailErrorLegalRepresnt: boolean = false;
    public emailErrorContact: boolean = false;
    public interested: boolean = false;
    public representative: boolean = false;
    public checked: boolean;

    @Input() user:UserCertificado;
    subject = new Subject<string>();
    isJuridic: boolean = false;
    isPhysic: boolean = false;

    constructor(private carpetaService: CarpetaService,
                private edicionService: EdicionTerceroService,
                public appUtils: AppUtils
        ) { }

    ngOnInit(): void { 
        this.formUserIdentification = new FormGroup({
            request_data: new FormGroup({}),
            identity_data: new FormGroup({}),
            notification_means: new FormGroup({}),
            representative_power: new FormGroup({}),
            interested_data: new FormGroup({}),
            productive_establishment: new FormGroup({}),
            representative_data: new FormGroup({}),
            legal_representative: new FormGroup({}),
            contact_data: new FormGroup({}),
            sosial_address: new FormGroup({})
          });

        this.carpetaService.getLoggedUser().pipe(
            takeUntil(this.unsubscribe$)
          ).subscribe(
            (data:UserCertificado) => {
              this.user = data;
              console.log(this.user.tipoCertificado);
              if(this.user.tipoCertificado === 'PERSONA_FISICA'){
                this.isPhysic = true;
                this.isJuridic = false;
              }else{
                  this.isJuridic = true;
                  this.isPhysic = false;
              }
            });
    }
    public handleInfo(info: string){
        this.subject.next(info);
      }
      goToRequestInfo(){
          console.log(this.formUserIdentification.value);
          this.edicionService.postDatesThird(this.formUserIdentification.value).subscribe((data)=>{
              console.log(data);
          })
      }
      return() {
        this.appUtils.return();
    }
}
