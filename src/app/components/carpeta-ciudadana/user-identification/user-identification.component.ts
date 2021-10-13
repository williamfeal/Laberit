import { ActivatedRoute, Router } from '@angular/router';
import {
  AfterViewChecked,
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnChanges,
  OnInit,
  SimpleChanges
  } from '@angular/core';
import { CarpetaService } from 'src/app/services/trex-service/carpeta.service';
import { CarpetaUtils } from 'src/app/utils/carpeta-utils';
import { ConceptConstants } from 'src/app/utils/constants/concept-constants';
import { Draft } from 'src/app/models/draft.model';
import { EMAIL_REGEX } from 'src/app/utils/constants/app-constants';
import { FormGroup } from '@angular/forms';
import { isEmptyObject } from 'jquery';
import { Procedure } from 'src/app/models/procedure.model';
import { ProceduresService } from 'src/app/services/moges-services/procedures.service';
import { Subject } from 'rxjs';
import { SwalUtils } from 'src/app/utils/swal-utils';
import { takeUntil } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import { UserCertificado } from 'src/app/models/user-certificate.model';

@Component({
  selector: 'app-user-identification',
  templateUrl: './user-identification.component.html',
  styleUrls: ['./user-identification.component.scss'],
})
export class UserIdentificationComponent implements OnInit, AfterViewChecked {

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
  public emailErrorLegalRepresnt: boolean = false;
  public emailErrorContact: boolean = false;
  public interested: boolean = false;
  public representative: boolean = false;

  public INTERESTED_CONCEPT = ConceptConstants.APPLICANT_TYPE_INTERESTED;
  public REPRESENTATIVE_CONCEPT = ConceptConstants.APPLICANT_TYPE_REPRESENTATIVE;

  public textError;
  public draft:Draft;
  public draftUserIdentification;

  private unsubscribe$ = new Subject<void>();
  subject = new Subject<string>();

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private proceduresService: ProceduresService,
    private carpetaUtils: CarpetaUtils,
    private translateService: TranslateService,
    private carpetaService:CarpetaService,
    private readonly changeDetectorRef: ChangeDetectorRef

  ) {
    
  }

  ngOnInit(): void {
    this.user = this.carpetaUtils.getSession();
    this.getDraft();
    this.idProcedure = this.activatedRoute.snapshot.queryParams.idProcedure;
    this.proceduresService.getProcedureById(this.idProcedure).pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe(
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
    this.translateService.get('error_texts.pop_up.form_error').pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe(
      text => {
        this.textError = text;
      }
    )
    this.subject.subscribe((text: string)=>{
      console.log(text);
    })
  }
  
  ngAfterViewChecked() {
    this.changeDetectorRef.detectChanges()
  }

  public handleInfo(info: string){
    this.subject.next(info);
  }

  public isUserAutonomo(): boolean {
    return false;
  }

  public getDraft() {
    if(this.activatedRoute.snapshot.queryParams.draft) {
      this.carpetaService.getDraftById(this.activatedRoute.snapshot.queryParams.draft).subscribe(
        (data:Draft) => {
          this.draft = data;
          if(JSON.parse(data.info).formUserIdentification) {
            this.draftUserIdentification = JSON.parse(data.info).formUserIdentification;
          }
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
      if(!isEmptyObject(this.formUserIdentification.value.legal_representative.legal_representative_email) &&
        this.formUserIdentification.value.legal_representative.legal_representative_email.match(EMAIL_REGEX) == null){
        error++;
        this.emailErrorLegalRepresnt = true;
      }
      if( !isEmptyObject(this.formUserIdentification.value.contact_data.contact_email) &&
        this.formUserIdentification.value.contact_data.contact_email.match(EMAIL_REGEX) == null){
        error++;
        this.emailErrorContact = true;
      }

      //Se ha de seleccionar el tipo de persona
      if (this.requesterType == '') {
        error++;
      }
    }
    //si no hay errores
    if (error == 0) {
      //llamada al back para mandar los datosc
      this.saveDraftAndNavigate();
    } else {
      //saber como notificar al usuario
      SwalUtils.showErrorAlert(this.textError.title, this.textError.text)
      this.showErrors = true;
    }
  }

  private saveDraftAndNavigate() {
    const infoProcedure = this.procedure.languages.find(
      language => language.codigo === localStorage.getItem('lang')
    );
    let infoProcedureJSON;
    if(this.draft) {
      infoProcedureJSON = JSON.parse(this.draft.info);
      infoProcedureJSON.formUserIdentification = this.formUserIdentification.value;

      this.draft.info = JSON.stringify(infoProcedureJSON);
      this.carpetaService.saveDraft(this.draft).subscribe(
          () => this.router.navigate(['carpeta-del-ciudadano/' + this.procedure.rutaFormulario], {
            queryParams: { draft: this.activatedRoute.snapshot.queryParams.draft }
          })
      )
    } else {
      infoProcedureJSON = { 
        idProcedure: this.idProcedure,
        formUserIdentification: this.formUserIdentification.value 
      }
      const draft:Draft = {
        fecha: '',
        key: '',
        desc: 'BORRADOR',
        info: JSON.stringify(infoProcedureJSON),
        linea: this.procedure.category.name,
        nif: sessionStorage.getItem('nifTitular'),
        producto: infoProcedure.name
      }
    
      this.carpetaService.saveDraft(draft).subscribe(
        data => this.router.navigate(['carpeta-del-ciudadano/' + this.procedure.rutaFormulario], {
          queryParams: { draft: data.key }
        })
      )
    }
    
  }


  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}

