import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { UserCertificado } from 'src/app/models/user-certificate.model';
import { CarpetaService } from 'src/app/services/acli-service/carpeta.service';
import { EdicionTerceroService } from 'src/app/services/acli-service/edicion-tercero.service';

@Component({
    selector: 'app-edicion-solicitud',
    templateUrl: './edicion-solicitud.component.html',
    styleUrls: ['./edicion-solicitud.component.scss']
})
export class EdicionSolicitudComponent implements OnInit {
    @Input() formUserIdentification:FormGroup;
    private unsubscribe$ = new Subject<void>();
    @Input() user:UserCertificado;
    subject = new Subject<string>();
    isJuridic: boolean = false;
    isPhysic: boolean = false;

    constructor(private carpetaService: CarpetaService,
                private edicionService: EdicionTerceroService
        ) { }

    ngOnInit(): void { 
        this.formUserIdentification = new FormGroup({
            identity_data: new FormGroup({}),
            productive_establishment: new FormGroup({})
        })

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
}
