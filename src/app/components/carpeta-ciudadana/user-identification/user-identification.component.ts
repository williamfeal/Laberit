import Swal from 'sweetalert2';
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
import { AppUtils } from 'src/app/utils/app-utils';
import { BusinessRule } from './../../../models/business-rules.model';
import { BusinessRuleBodyAddress, BusinessRuleBodyCompanyType } from './../../../models/business-rules-body.model';
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
  public isLoading: boolean = false;

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
  public checked: boolean = false;
  public position_contact: boolean;
  public viewMyRequest: string = 'solicitante';
  public representativeLabel: string = 'Representante';

  public textError;
  public draft: Draft;
  public draftUserIdentification;

  private unsubscribe$ = new Subject<void>();

  public subject = new Subject<string>();

  public readOnlyView: boolean = false;
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private proceduresService: ProceduresService,
    private carpetaUtils: CarpetaUtils,
    private translateService: TranslateService,
    private businessRulesService: BusinessRulesService,
    private draftService: DraftsService,
    private carpetaService: CarpetaService,
    private readonly changeDetectorRef: ChangeDetectorRef,
    public appUtils: AppUtils
  ) {
    localStorage.getItem("ReadOnly") === 'true' ? this.readOnlyView = true : this.readOnlyView = false;
  }

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
      });
  }

  ngAfterViewChecked() {
    this.changeDetectorRef.detectChanges()
  }

  public handleInfo(info: string) {
    this.subject.next(info);
  }

  public isUserAutonomo(): boolean {
    return false;
  }

  public onChangeChecked(event) {
    this.checked = event;
  }

  public getDraft() {
    if (this.activatedRoute.snapshot.queryParams.draft) {
      this.draftService.getDraftById(this.activatedRoute.snapshot.queryParams.draft + ':forms:formUserIdentification').subscribe(
        (data: Draft) => {
          this.draft = data;
          this.draftUserIdentification = JSON.parse(data.info);
        },
        () => this.setDraft())
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

  onChangeBusinessTypeOutput(event: any) {
    //Eliminate the 'position' field in "Contact details" when the company type is Anonimus
    this.position_contact = event === ConceptConstants.REPRESENTATIVE_PHYSIC_AUTONOMOUS ? false : true;
  }

  onChangebusinessTypeData(event: any){
    if(event === ConceptConstants.REPRESENTATIVE_TYPES_JURIDIC_PERSON){
      this.representativeLabel = 'Representante legal';
    }else{
      this.representativeLabel = 'Representante';
    }    
  }

  public goToRequestInfo() {
    let error = 0;
    this.changeDetectorRef.detectChanges();
    if (this.checked == true) {
      this.formUserIdentification.controls['contact_data'].get('contact_email').setValue(this.formUserIdentification.value.notification_means.email);

      if (this.interested == true) {
        this.formUserIdentification.controls['contact_data'].get('contact_name').setValue(this.formUserIdentification.value.interested_data.interested_data_name);
        this.formUserIdentification.controls['contact_data'].get('contact_surname1').setValue(this.formUserIdentification.value.interested_data.interested_data_surname1);
        this.formUserIdentification.controls['contact_data'].get('contact_surname2').setValue(this.formUserIdentification.value.interested_data.interested_data_surname2);
        this.formUserIdentification.controls['contact_data'].get('contact_nif').setValue(this.formUserIdentification.value.interested_data.interested_data_nif);
        this.formUserIdentification.controls['contact_data'].get('contact_telephone').setValue(this.formUserIdentification.value.interested_data.interested_telephone);
        this.formUserIdentification.controls['contact_data'].get('contact_via_type').setValue(this.formUserIdentification.value.sosial_address.via_type);
        this.formUserIdentification.controls['contact_data'].get('contact_number').setValue(this.formUserIdentification.value.sosial_address.number);
        this.formUserIdentification.controls['contact_data'].get('contact_address').setValue(this.formUserIdentification.value.sosial_address.address);
        this.formUserIdentification.controls['contact_data'].get('contact_extra').setValue(this.formUserIdentification.value.sosial_address.extra);
        this.formUserIdentification.controls['contact_data'].get('contact_CP').setValue(this.formUserIdentification.value.sosial_address.social_cp);
        this.formUserIdentification.controls['contact_data'].get('contact_data_country').setValue(this.formUserIdentification.value.sosial_address.social_country);
        if(this.formUserIdentification.controls['contact_data'].get('contact_data_province')
          && this.formUserIdentification.value.sosial_address.social_province)
          this.formUserIdentification.controls['contact_data'].get('contact_data_province').setValue(this.formUserIdentification.value.sosial_address.social_province);
        if(this.formUserIdentification.controls['contact_data'].get('contact_data_municipality')
          && this.formUserIdentification.value.sosial_address.social_municipality)
          this.formUserIdentification.controls['contact_data'].get('contact_data_municipality').setValue(this.formUserIdentification.value.sosial_address.social_municipality);
      }
      if (this.representative == true) {
        this.formUserIdentification.controls['contact_data'].get('contact_nif').setValue(this.formUserIdentification.value.representative_data.represented_data_nif);
        this.formUserIdentification.controls['contact_data'].get('contact_telephone').setValue(this.formUserIdentification.value.representative_data.represented_data_telephone);
        this.formUserIdentification.controls['contact_data'].get('contact_via_type').setValue(this.formUserIdentification.value.sosial_address.via_type);
        if (this.position_contact = true) {
          this.formUserIdentification.controls['contact_data'].get('contact_position').setValue(this.formUserIdentification.value.representative_data.contact_position);
          this.formUserIdentification.controls['contact_data'].get('contact_name').setValue(this.formUserIdentification.value.representative_data.represented_data_name);
          this.formUserIdentification.controls['contact_data'].get('contact_surname1').setValue(this.formUserIdentification.value.representative_data.represented_data_surname1);
          this.formUserIdentification.controls['contact_data'].get('contact_surname2').setValue(this.formUserIdentification.value.representative_data.represented_data_surname2);
        } else {
          this.formUserIdentification.controls['contact_data'].get('contact_name').setValue(this.formUserIdentification.value.representative_data.represented_data_social_reason);

        }
        this.formUserIdentification.controls['contact_data'].get('contact_number').setValue(this.formUserIdentification.value.sosial_address.number);
        this.formUserIdentification.controls['contact_data'].get('contact_address').setValue(this.formUserIdentification.value.sosial_address.address);
        this.formUserIdentification.controls['contact_data'].get('contact_extra').setValue(this.formUserIdentification.value.sosial_address.extra);
        this.formUserIdentification.controls['contact_data'].get('contact_CP').setValue(this.formUserIdentification.value.sosial_address.social_cp);
        this.formUserIdentification.controls['contact_data'].get('contact_data_country').setValue(this.formUserIdentification.value.sosial_address.social_country);
        if(this.formUserIdentification.controls['contact_data'].get('contact_data_province')
          && this.formUserIdentification.value.sosial_address.social_province)
          this.formUserIdentification.controls['contact_data'].get('contact_data_province').setValue(this.formUserIdentification.value.sosial_address.social_province);
        if(this.formUserIdentification.controls['contact_data'].get('contact_data_municipality')
          && this.formUserIdentification.value.sosial_address.social_municipality)
          this.formUserIdentification.controls['contact_data'].get('contact_data_municipality').setValue(this.formUserIdentification.value.sosial_address.social_municipality);
      }
    }
    if (this.procedure.rutaFormulario != 'instancia-general') {
      if (this.formUserIdentification.valid) {
        this.validate = false;
      } else {
        this.validate = true;
        error++;
      }

      if (error == 0) {
        (this.representative === true && sessionStorage.getItem('nifTitular') !== this.formUserIdentification.value.representative_data.represented_data_nif) ?
          this.callRepresenta() :
          this.checkBusinessRuleCompanyType();
      } else {
        this.showErrors = true;
        Swal.fire({
          title: this.textError.title,
          text: this.textError.text,
        }).then((result)=>{
          if(result.isConfirmed){
            this.showErrors = false;
          }
        })
        
      }
    }
  }

  private callRepresenta() {
    this.carpetaService.canRepresentativeProcedure(
      this.formUserIdentification.controls.representative_data.value.represented_data_nif, sessionStorage.getItem('nifTitular')).subscribe(
        data => {
          if (data === true) {
            this.checkBusinessRuleCompanyType();
          } else if (data === false) {
            SwalUtils.showErrorAlert('', 'El poder de representación no se encuentra en Representa, por favor introduzca un CIF o NIF correcto');
          } else {
            SwalUtils.showErrorAlert('', 'Ha habido un error interno. Si el error persiste, contacte con el administrador.')
          }
        }
      )
  }

  private checkBusinessRuleCompanyType() {
    const activo = this.representative ?
      this.formUserIdentification.value.representative_data.represented_data_active :
      this.formUserIdentification.value.interested_data.interested_data_active || 0;
    const turnover = this.representative ?
      this.formUserIdentification.value.representative_data.represented_data_turnover :
      this.formUserIdentification.value.interested_data.interested_data_turnover || 0;
    const num_empleados = this.representative ?
      this.formUserIdentification.value.representative_data.represented_data_employees_number :
      this.formUserIdentification.value.interested_data.interested_data_employees_number;
    const company_type = sessionStorage.getItem('company_type') === ConceptConstants.REPRESENTATIVE_MICRO_BUSINESS || sessionStorage.getItem('company_type') === ConceptConstants.REPRESENTATIVE_MICRO_BUSINESS ?
      'Microempresa' : sessionStorage.getItem('company_type') === ConceptConstants.REPRESENTATIVE_PYME || sessionStorage.getItem('company_type') === ConceptConstants.REPRESENTATIVE_PYME ?
        'Pyme' : '';

    const ruleBody: BusinessRuleBodyCompanyType = {
      tipoEmpresa: company_type,
      activo: activo || 0,
      cifraNegocio: turnover || 0,
      numEmpleados: num_empleados || 0
    };
    const rule: BusinessRule = {
      tableKey: "reglasTipoEmpresa",
      body: ruleBody
    }
    this.businessRulesService.businessRuleDecision(rule).subscribe(
      (data: Decision) => {
        if (data.decision) {
          this.saveDraftAndNavigate();
        } else {
          this.showErrors = true;
          Swal.fire({
            title:  'Error',
            text: data.motive,
          }).then((result)=>{
            if(result.isConfirmed){
              this.showErrors = false;
            }
          })
        }

      }
    )
  }

  private saveDraftAndNavigate() {
    if (this.draft) {
      this.saveDraftUserIdentification();
    } else {
      const info = { idProcedure: sessionStorage.getItem('idProcedure') };
      const infoProcedure = this.procedure.languages.find(
        language => language.codigo === localStorage.getItem('lang')
      );
      const draft: Draft = {
        key: '',
        desc: 'Borrador',
        idInfo: 'info',
        info: JSON.stringify(info),
        linea: infoProcedure.name,
        nif: sessionStorage.getItem('nifTitular'),
        producto: this.procedure.category.name,
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
    const draftUserIdentification: Draft = new Draft(sessionStorage.getItem('nifTitular'), 'BORRADOR', JSON.stringify(this.formUserIdentification.value), this.procedure.category.name,
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
  return() {
    this.appUtils.return();
  }
}

