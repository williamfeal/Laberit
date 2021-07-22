import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EMAIL_REGEX } from 'src/app/utils/constants/app-constants';

@Component({
  selector: 'app-user-identification',
  templateUrl: './user-identification.component.html',
  styleUrls: ['./user-identification.component.scss']
})
export class UserIdentificationComponent implements OnInit {

  public requesterType = 'interested';

  public user;
  public idProcedure: string;
  public formUserIdentification: FormGroup;
  public showErrors = false;
  public readOnly: boolean;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.idProcedure = this.activatedRoute.snapshot.queryParams.idProcedure;
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
    //Si es electrónico es necesario el corre con buen formato
    if (this.formUserIdentification.value.notification_means.notification_means != 2 && this.formUserIdentification.value.notification_means.email.match(EMAIL_REGEX) == null) {
        //cambiar clases a los inputs erroneos
        error++;
    }
    //Si es reprsentante es necesaria más información
    if (this.requesterType == 'representative') {
      //cambiar clases a los inputs erroneos
      error++;
    }
    //si no hay errores
    if (error == 0) {
      //llamada al back para mandar los datos
      this.router.navigate(['carpeta-del-ciudadano/instancia-general']);
    } else {
      //saber como notificar al usuario
      this.showErrors = true;
    }
  }
}
