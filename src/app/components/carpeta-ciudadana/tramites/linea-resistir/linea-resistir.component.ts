import { ActivatedRoute, Router } from '@angular/router';
import { BusinessRule } from './../../../../models/business-rules.model';
import { BusinessRuleBody } from './../../../../models/business-rules-body.model';
import { BusinessRulesService } from './../../../../services/acli-service/business-rules.service';
import { CarpetaService } from 'src/app/services/acli-service/carpeta.service';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ConceptConstants } from 'src/app/utils/constants/concept-constants';
import { Decision } from './../../../../models/decision.model';
import { Draft } from 'src/app/models/draft.model';
import { DraftsService } from './../../../../services/acli-service/drafts.service';
import {
    FormBuilder,
    FormControl,
    FormGroup,
    Validators
    } from '@angular/forms';
import { Procedure } from 'src/app/models/procedure.model';
import { ProceduresService } from 'src/app/services/moges-services/procedures.service';
import { Subject } from 'rxjs';
import { SwalUtils } from 'src/app/utils/swal-utils';
import { takeUntil } from 'rxjs/operators';
import { tipoProyecto } from 'src/app/utils/constants/app-constants';
import { TranslateService } from '@ngx-translate/core';
import { UrlConstants } from 'src/app/utils/constants/url-constants';

@Component({
    selector: 'linea-resistir',
    templateUrl: 'linea-resistir.component.html',
    styleUrls: ['./linea-resistir.component.scss']
})

export class LineaResistirComponent implements OnInit {

    public draft:Draft;
    public formLineaResistir: FormGroup;
    public procedure:Procedure;

    private businessRuleBody = new BusinessRuleBody;
    
    showInversion = false;
    showCirculante = false;

    validate: boolean = false;

    private unsubscribe$ = new Subject<void>();

    //se bebera de los catalogos
    tipoProyecto = tipoProyecto;
    company_type: string;
    constructor(
        private activatedRoute:ActivatedRoute,
        private router: Router,
        private ref: ChangeDetectorRef,
        private procedureService:ProceduresService,
        private translate:TranslateService,
        private draftService:DraftsService,
        private businessRuleService:BusinessRulesService
    ) {

    }

    ngOnInit() {
        this.getDraft();
        this.newForm();
        this.procedureService.getProcedureById(sessionStorage.getItem('idProcedure')).pipe(
            takeUntil(this.unsubscribe$)
        ).subscribe(
            data => this.procedure = data
          )
    }

    ngOnChanges() {
        this.ref.detectChanges();
    }

    private getDraft() {
        if(this.activatedRoute.snapshot.queryParams.draft){
            this.draftService.getDraftById(this.activatedRoute.snapshot.queryParams.draft).subscribe(
                data => this.draft = data
            )
        }
    }

    newForm() {
        this.formLineaResistir = new FormGroup({  });
    }

    public goToDocumentation() {
        if (this.formLineaResistir.valid) {
            //TO DO: Llamada al back con los datos 
            this.getDecision();
        } else {
            this.translate.get('error_texts.pop_up.form_error').pipe(
                takeUntil(this.unsubscribe$)
            ).subscribe(
                error => {
                    SwalUtils.showErrorAlert(
                        error.title, 
                        error.text)
                    this.validate = true;
                }
            )
           
        }
    }

    private getDecision() {
        const isAutonomoMicroEmp = sessionStorage.getItem('company_type') === ConceptConstants.REPRESENTATIVE_PERSON_AUTONOMOUS ||
        sessionStorage.getItem('company_type') === ConceptConstants.REPRESENTATIVE_MICRO_BUSINESS  ?
        true : false;
        
        const ruleBody:BusinessRuleBody = {
            autonomoMicroEmp: isAutonomoMicroEmp,
            importe: this.formLineaResistir.controls['importe'].value,
            g1terrenos: this.formLineaResistir.controls['g1terrenos'].value,
            g1inmuebles: this.formLineaResistir.controls['g1inmuebles'].value,
            g1maquinaria: this.formLineaResistir.controls['g1maquinaria'].value,
            g1instalaciones: this.formLineaResistir.controls['g1instalaciones'].value,
            g1otros: this.formLineaResistir.controls['g1otros'].value,
            recursosPropios: this.formLineaResistir.controls['recursosPropios'].value,
            subvenciones: this.formLineaResistir.controls['subvenciones'].value,
            otraFinBancaria: this.formLineaResistir.controls['otraFinBancaria'].value,
            activoIVF: this.formLineaResistir.controls['activoIVF'].value,
            g2importeFinanciarCirculante: this.formLineaResistir.controls['g2importeFinanciarCirculante'].value,
            g2financiacionIVF: this.formLineaResistir.controls['g2financiacionIVF'].value,
            porcentaje: 100,
            g3inversionActivosFijos: this.formLineaResistir.controls['g3inversionActivosFijos'].value,
            g3inversionActivoCirculante: this.formLineaResistir.controls['g3inversionActivoCirculante'].value,
            g3totalPrestamo: this.formLineaResistir.controls['g3totalPrestamo'].value,
            tipoProyecto: this.formLineaResistir.controls['project_type'].value,
        }
        const rule:BusinessRule = { 
            tableKey: "decisionResistir",
            body:  ruleBody
        }
        this.businessRuleService.businessRuleDecision(rule).subscribe(
            (data:Decision) => {
                if(data.decision === true)  this.saveDraftAndNavigate();
                else SwalUtils.showErrorAlert(
                    'Error',
                    data.motive
                )
            }
        )
    }

    private saveDraftAndNavigate() {
        if(this.draft) {
            const infoJSON = JSON.parse(this.draft.info);
            infoJSON.formLineaResistir = this.formLineaResistir.value;
            this.draft.info = JSON.stringify(infoJSON);

            this.draftService.saveDraft(this.draft).subscribe(
                () => this.router.navigate([UrlConstants.VIEW_ADJUNTAR], { queryParams: { draft: this.draft.key }})
            )
        } else {
            this.router.navigate([UrlConstants.VIEW_ADJUNTAR]);
        }     
    }


    ngOnDestroy(): void {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }
}