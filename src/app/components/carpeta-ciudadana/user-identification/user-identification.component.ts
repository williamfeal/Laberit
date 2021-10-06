import { AfterViewInit, Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Procedure } from 'src/app/models/procedure.model';
import { ProceduresService } from 'src/app/services/moges-services/procedures.service';
import { EMAIL_REGEX } from 'src/app/utils/constants/app-constants';
import { UserCertificado } from 'src/app/models/user-certificate.model';
import { CarpetaUtils } from 'src/app/utils/carpeta-utils';
import { SwalUtils } from 'src/app/utils/swal-utils';
import { TranslateService } from '@ngx-translate/core';
import { ConceptConstants } from 'src/app/utils/constants/concept-constants';
import { CarpetaService } from 'src/app/services/trex-service/carpeta.service';
import { Draft } from 'src/app/models/draft.model';

@Component({
  selector: 'app-user-identification',
  templateUrl: './user-identification.component.html',
  styleUrls: ['./user-identification.component.scss']
})
export class UserIdentificationComponent implements OnInit {

  public requesterType = '';

  public user: UserCertificado;
  public validate: boolean = false;
  public idProcedure: string;
  public formUserIdentification: FormGroup;
  public showErrors = false;
  public readOnly: boolean;
  public emailError = false;
  public emailErrorText: string = 'format_error';
  public notificationError = false;
  public notificationErrorText: string = 'empty_error';
  public procedure: Procedure;

  public interested: boolean = false;
  public representative: boolean = false;

  public INTERESTED_CONCEPT = ConceptConstants.APPLICANT_TYPE_INTERESTED;
  public REPRESENTATIVE_CONCEPT = ConceptConstants.APPLICANT_TYPE_REPRESENTATIVE;

  public textError;
  public draft;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private proceduresService: ProceduresService,
    private carpetaUtils: CarpetaUtils,
    private translateService: TranslateService,
    private carpetaService:CarpetaService
  ) {
    
  }

  ngOnInit(): void {
    this.user = this.carpetaUtils.getSession();
    this.getDraft();
    this.idProcedure = this.activatedRoute.snapshot.queryParams.idProcedure;
    this.proceduresService.getProcedureById(this.idProcedure).subscribe(
      (procedure: Procedure) => {
        this.procedure = procedure;
      })
    this.formUserIdentification = new FormGroup({
      request_data: new FormGroup({}),
      identity_data: new FormGroup({}),
      notification_means: new FormGroup({}),
      interested_data: new FormGroup({}),
      productive_establishment: new FormGroup({}),
      representative_data: new FormGroup({}),
      legal_representative: new FormGroup({}),
      contact_data: new FormGroup({}),
      sosial_address: new FormGroup({})
    });
    this.translateService.get('error_texts.pop_up.form_error').subscribe(
      text => {
        this.textError = text;
      }
    )
    console.log(this.formUserIdentification);
  }

  public isUserAutonomo(): boolean {
    return false;
  }

  public getDraft() {
    if(this.activatedRoute.snapshot.queryParams.draft) {
      this.carpetaService.getDraftById(this.activatedRoute.snapshot.queryParams.draft).subscribe(
        (data:Draft) => {
          this.draft = data;
        })
      }
  }

  onChangeTypeRequester(event) {
    this.requesterType = event;
    if (this.requesterType == ConceptConstants.APPLICANT_TYPE_INTERESTED) {
      this.interested = true;
      this.representative = false;
    }

    if (this.requesterType == ConceptConstants.APPLICANT_TYPE_REPRESENTATIVE) {
      this.interested = false;
      this.representative = true;
    }                         
  }

  public goToRequestInfo() {
    let error = 0;
    const infoProcedure = this.procedure.languages.find(
      language => language.codigo === localStorage.getItem('lang')
    );
    const infoProcedureJSON = { 
      idProcedure: this.idProcedure,
      ...this.formUserIdentification.value }
    const draft:Draft = {
      fecha: "",
      key: "",
      desc: 'linea-resistir-' + new Date().getMilliseconds(),
      info: JSON.stringify(infoProcedureJSON),
      linea: this.procedure.category.name,
      nif: sessionStorage.getItem('nifTitular'),
      producto: infoProcedure.name
    }
    this.carpetaService.saveDraft(draft).subscribe(
      data => console.log(data)
    )
    
    //para poder hacer pruebas para instancia general no se comprobara ningun campo
    if (this.procedure.rutaFormulario != 'instancia-general') {

      if (this.formUserIdentification.valid) {
        this.validate = false;
      } else {
        this.validate = true;
        error++;
      }
      //Es necesario el correo con buen formato
      if (this.formUserIdentification.value.notification_means.email.match(EMAIL_REGEX) == null) {
        error++;
        this.emailError = true;
      }

      //Se ha de seleccionar el tipo de persona
      if (this.requesterType == '') {
        error++;
      }
    }
    //si no hay errores
    if (error == 0) {
      //llamada al back para mandar los datos
      this.router.navigate(['carpeta-del-ciudadano/' + this.procedure.rutaFormulario]);
    } else {
      //saber como notificar al usuario
      SwalUtils.showErrorAlert(this.textError.title, this.textError.text)
      this.showErrors = true;
    }
  }
}

