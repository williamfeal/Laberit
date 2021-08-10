import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Procedure } from 'src/app/models/procedure.model';
import { ProceduresService } from 'src/app/services/moges-services/procedures.service';
import { EMAIL_REGEX } from 'src/app/utils/constants/app-constants';
import { UserCertificado } from 'src/app/models/user-certificate.model';
import { CarpetaUtils } from 'src/app/utils/carpeta-utils';

@Component({
  selector: 'app-user-identification',
  templateUrl: './user-identification.component.html',
  styleUrls: ['./user-identification.component.scss']
})
export class UserIdentificationComponent implements OnInit {

  public requesterType = 'interested';

  public user: UserCertificado;
  public idProcedure: number;
  public formUserIdentification: FormGroup;
  public showErrors = false;
  public readOnly: boolean;
  public emailError = false;
  public emailErrorText: string = 'format_error';
  public notificationError = false;
  public notificationErrorText: string = 'empty_error';
  public procedure: Procedure;
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private proceduresService: ProceduresService,
    private carpetaUtils: CarpetaUtils
  ) {
    this.idProcedure = this.activatedRoute.snapshot.queryParams.idProcedure;
    this.proceduresService.getAllProcedure().subscribe(
      (procedures: Procedure[]) => {
        this.procedure = procedures.find(element => element.id == this.idProcedure);
      })
    this.formUserIdentification = new FormGroup({
      identity_data: new FormGroup({}),
      notification_means: new FormGroup({}),
      actuation_data: new FormGroup({}),
      interested_data: new FormGroup({}),
      productive_establishment: new FormGroup({}),
      representative_data: new FormGroup({}),
      legal_representative: new FormGroup({}),
      contact_data: new FormGroup({})
    });
  }

  ngOnInit(): void {
    this.user = this.carpetaUtils.getSession();
  }

  public isInteresado(): boolean {
    return this.requesterType === 'interested';
  }

  public isRepresentative(): boolean {
    return this.requesterType === 'representative';
  }

  public isUserAutonomo(): boolean {
    return false;
  }

  onChangeTypeRequester(event) {
    this.requesterType = event;
  }

  public goToRequestInfo() {
    let error = 0;
    //Si es electr�nico es necesario el corre con buen formato
    if (this.formUserIdentification.value.notification_means.notification_means == 0) {
      error++;
      this.notificationError = true;
    } else if (this.formUserIdentification.value.notification_means.notification_means != 2 && this.formUserIdentification.value.notification_means.email.match(EMAIL_REGEX) == null) {
      error++;
      this.emailError = true;
    }
    //Si es reprsentante es necesaria m�s informaci�n
    if (this.requesterType == 'representative') {
      //cambiar clases a los inputs erroneos
      error++;
    }
    //si no hay errores
    if (error == 0) {
      //llamada al back para mandar los datos
      this.router.navigate(['carpeta-del-ciudadano/' + this.procedure.rutaFormulario]);
    } else {
      //saber como notificar al usuario
      this.showErrors = true;
    }
  }
}

