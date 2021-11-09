import { ActivatedRoute, Router } from '@angular/router';
import { BusinessRule } from './../../../../models/business-rules.model';
import { BusinessRuleBody } from './../../../../models/business-rules-body.model';
import { BusinessRulesService } from './../../../../services/acli-service/business-rules.service';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ConceptConstants } from 'src/app/utils/constants/concept-constants';
import { Decision } from './../../../../models/decision.model';
import { Draft } from 'src/app/models/draft.model';
import { DraftsService } from './../../../../services/acli-service/drafts.service';
import { FormGroup } from '@angular/forms';
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
        this.formLineaResistir = new FormGroup({});
        this.procedureService.getProcedureById(sessionStorage.getItem('idProcedure')).pipe(
            takeUntil(this.unsubscribe$)
        ).subscribe(
            (data:Procedure) => {
                this.procedure = data;
                this.getDraft();
            } 
          )
    }

    ngOnChanges() {
        this.ref.detectChanges();
    }

    private getDraft() {
        if(this.activatedRoute.snapshot.queryParams.draft){
            this.draftService.getDraftById(this.activatedRoute.snapshot.queryParams.draft + ':forms:formLineaResistir').subscribe(
                (data:Draft) => {
                    this.draft = data;
                }, 
                () => this.setDraft()
            )
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
                })  
        }
    }

    private getDecision() {
        const isAutonomoMicroEmp = sessionStorage.getItem('company_type') === ConceptConstants.REPRESENTATIVE_PERSON_AUTONOMOUS ||
            sessionStorage.getItem('company_type') === ConceptConstants.REPRESENTATIVE_MICRO_BUSINESS || sessionStorage.getItem('company_type') === ConceptConstants.REPRESTATIVE_PHISYC_MICRO_BUSINESS ?
            true : false;
        let tipoProyecto;
        switch(this.formLineaResistir.controls['project_type'].value) {
            case 'linea-resistir-project-type-G1-investment':
                tipoProyecto = 'Inversion';
                break;
            case 'linea-resistir-project-type-G2-circulating':
                tipoProyecto = 'Circulante';
                break;
            case 'linea-resistir-project-type-G3-investment-and-circulating':
                tipoProyecto = 'Inversion y Circulante';
                break;
        }
        const ruleBody:BusinessRuleBody = {
            autonomoMicroEmp: isAutonomoMicroEmp,
            importe: this.formLineaResistir.controls['importe'].value || 0,
            g1terrenos: this.formLineaResistir.controls['g1terrenos'].value || 0,
            g1inmuebles: this.formLineaResistir.controls['g1inmuebles'].value || 0,
            g1maquinaria: this.formLineaResistir.controls['g1maquinaria'].value || 0,
            g1instalaciones: this.formLineaResistir.controls['g1instalaciones'].value || 0,
            g1otros: this.formLineaResistir.controls['g1otros'].value || 0,
            recursosPropios: this.formLineaResistir.controls['recursosPropios'].value || 0,
            subvenciones: this.formLineaResistir.controls['subvenciones'].value || 0,
            otraFinBancaria: this.formLineaResistir.controls['otraFinBancaria'].value || 0,
            activoIVF: this.formLineaResistir.controls['activoIVF'].value || 0,
            g2importeFinanciarCirculante: this.formLineaResistir.controls['g2importeFinanciarCirculante'].value || 0,
            g2financiacionIVF: this.formLineaResistir.controls['g2financiacionIVF'].value || 0,
            porcentaje: 100,
            g3inversionActivosFijos: this.formLineaResistir.controls['g3inversionActivosFijos'].value || 0,
            g3inversionActivoCirculante: this.formLineaResistir.controls['g3inversionActivoCirculante'].value || 0,
            g3totalPrestamo: this.formLineaResistir.controls['g3totalPrestamo'].value || 0,
            tipoProyecto: this.formLineaResistir.controls['project_type'].value || 0,
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
        const infoProcedure = this.procedure.languages.find(
            language => language.codigo === localStorage.getItem('lang')
          );
      
        const draft:Draft = new Draft(sessionStorage.getItem('nifTitular'), 'BORRADOR', JSON.stringify(this.formLineaResistir.value), this.procedure.category.name,
        infoProcedure.name, 'forms:formLineaResistir', this.draft.key, '');

        this.draftService.saveDraft(draft).subscribe(
            () => this.router.navigate([UrlConstants.VIEW_ADJUNTAR], { queryParams: { draft: this.draft.key }})
        )
        
    }

    public returnToDraft() {
        this.router.navigate(['/carpeta-del-ciudadano/identificacion'], {
            queryParams: {
                idProcedure: sessionStorage.getItem('idProcedure'),
                draft: this.draft.key
            }
        })
          
    }
    
    ngOnDestroy(): void {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }
}