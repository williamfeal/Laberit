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
import { BusinessRule } from './../../../models/business-rules.model';
import { BusinessRuleBodyUserIdentification } from './../../../models/business-rules-body.model';
import { BusinessRulesService } from './../../../services/acli-service/business-rules.service';
import { CarpetaService } from 'src/app/services/acli-service/carpeta.service';
import { CarpetaUtils } from 'src/app/utils/carpeta-utils';
import { ConceptConstants } from 'src/app/utils/constants/concept-constants';
import { Decision } from './../../../models/decision.model';
import { Draft } from 'src/app/models/draft.model';
import { DraftsService } from './../../../services/acli-service/drafts.service';
import { EMAIL_REGEX } from 'src/app/utils/constants/app-constants';
import { FormControl, FormGroup } from '@angular/forms';
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
  public responseSubjectProductive = {}
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
  public checked: boolean;

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
    private businessRulesService:BusinessRulesService,
    private draftService:DraftsService,
    private readonly changeDetectorRef: ChangeDetectorRef

  ) {
    
  }

  ngOnInit(): void {
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

    this.user = this.carpetaUtils.getSession();


    this.idProcedure = this.activatedRoute.snapshot.queryParams.idProcedure;

    this.proceduresService.getProcedureById(this.idProcedure).pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe(
      (procedure: Procedure) => {
        this.procedure = procedure;
        this.getDraft();
    })
    
    this.translateService.get('error_texts.pop_up.form_error').pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe(
      text => {
        this.textError = text;
      }
    )
   
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
      this.draftService.getDraftById(this.activatedRoute.snapshot.queryParams.draft + ':forms:formUserIdentification').subscribe(
        (data:Draft) => {
          this.draft = data;
          this.draftUserIdentification = JSON.parse(data.info);
        },
        () => this.setDraft() )
      }
  }

  private setDraft() {
    const info = { idProcedure: sessionStorage.getItem('idProcedure') };
    const infoProcedure = this.procedure.languages.find(
      language => language.codigo === localStorage.getItem('lang')
    );
    this.draft = new Draft(sessionStorage.getItem('nifTitular'), 'Borrador', JSON.stringify(info), this.procedure.category.name, infoProcedure.name,
      'info', this.activatedRoute.snapshot.queryParams.draft);
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
    if (this.procedure.rutaFormulario != 'instancia-general') {
      if (this.formUserIdentification.valid) {
        this.validate = false;
      } else {
        this.validate = true;
        error++;
      }
      if (error == 0) {
        this.checkBusinessRules();
      } else {
        SwalUtils.showErrorAlert(this.textError.title, this.textError.text)
        this.showErrors = true;
      }
    }
  }

  private checkBusinessRules() {
    const activo = this.representative ? 
      this.formUserIdentification.value.representative_data.represented_data_active :
      this.formUserIdentification.value.interested_data.interested_data_active || 0;
    const turnover = this.representative ?
      this.formUserIdentification.value.representative_data.represented_data_turnover :
      this.formUserIdentification.value.interested_data.interested_data_turnover || 0;
    const num_empleados = this.representative ?
      this.formUserIdentification.value.representative_data.represented_data_employees_number :
      this.formUserIdentification.value.interested_data.interested_data_employees_number || 0;  
    const company_type = sessionStorage.getItem('company_type') === ConceptConstants.REPRESENTATIVE_MICRO_BUSINESS || sessionStorage.getItem('company_type') === ConceptConstants.REPRESTATIVE_PHISYC_MICRO_BUSINESS ?
      'Microempresa' : sessionStorage.getItem('company_type') === ConceptConstants.REPRESENTATIVE_PYME || sessionStorage.getItem('company_type') ===  ConceptConstants.REPRESTATIVE_PHISYC_PYME ? 
      'Pyme' : '';
    
    const ruleBody:BusinessRuleBodyUserIdentification = {
      tipoEmpresa: company_type,
      activo: activo,
      cifraNegocio: turnover,
      numEmpleados: num_empleados
    };
    const rule:BusinessRule = {
      tableKey: "reglasTipoEmpresa",
      body: ruleBody
    }
    this.businessRulesService.businessRuleDecision(rule).subscribe(
      (data:Decision) => {
        data.decision ? this.saveDraftAndNavigate() : 
          SwalUtils.showErrorAlert(
            'Error',
            data.motive
          )
      }
    )
  }

  private saveDraftAndNavigate() {
    if(this.draft) {
      this.saveDraftUserIdentification();    
    }  else {
      const info = { idProcedure: sessionStorage.getItem('idProcedure') };
      const infoProcedure = this.procedure.languages.find(
        language => language.codigo === localStorage.getItem('lang')
      );
      const draft:Draft = {
        key: '',
        desc: 'Borrador',
        idInfo: 'info',
        info: JSON.stringify(info),
        linea: this.procedure.category.name,
        nif: sessionStorage.getItem('nifTitular'),
        producto: infoProcedure.name,
        fecha: ''  
      }
      this.draftService.saveDraft(draft).subscribe(
        data => {
          this.draft = data;
          this.saveDraftUserIdentification();
        });
    }
  }

  private saveDraftUserIdentification() {
    const infoProcedure = this.procedure.languages.find(
      language => language.codigo === localStorage.getItem('lang')
    );
    const draftUserIdentification:Draft = new Draft(sessionStorage.getItem('nifTitular'), 'BORRADOR', JSON.stringify(this.formUserIdentification.value), this.procedure.category.name,
      infoProcedure.name, 'forms:formUserIdentification', this.draft.key, '');
    this.draftService.saveDraft(draftUserIdentification).subscribe(
      () => this.router.navigate(['carpeta-del-ciudadano/' + this.procedure.rutaFormulario], {
        queryParams: { draft: this.draft.key }
      })
    )
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}

