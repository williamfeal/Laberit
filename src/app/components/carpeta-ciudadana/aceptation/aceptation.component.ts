import { ActivatedRoute, Router } from '@angular/router';
import { AppUtils } from 'src/app/utils/app-utils';
import { CarpetaService } from 'src/app/services/acli-service/carpeta.service';
import { CatalogsService } from 'src/app/services/catalogs/catalogs.service';
import { Component, OnInit } from '@angular/core';
import { Concept } from 'src/app/models/concept.model';
import { ConceptConstants } from 'src/app/utils/constants/concept-constants';
import { Draft } from 'src/app/models/draft.model';
import { DraftsService } from './../../../services/acli-service/drafts.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { of, Subject } from 'rxjs';
import { Procedure } from 'src/app/models/procedure.model';
import { ProceduresService } from 'src/app/services/moges-services/procedures.service';
import { SwalUtils } from 'src/app/utils/swal-utils';
import { takeUntil } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import { MatDialog } from '@angular/material/dialog';
import { Aceptation } from './dialog-data-protection/data-protection.component';

@Component({
  selector: 'app-aceptation',
  templateUrl: './aceptation.component.html',
  styleUrls: ['./aceptation.component.scss']
})
export class AceptationComponent implements OnInit {

  public formAceptation: FormGroup;
  public validate: boolean = false;
  public procedure: Procedure;
  public manifestations: Concept[];

  public data_protection_mandatory: Concept[];
  public data_protection_optional: Concept[];

  public isRequired = true;
  public draftFormAceptation;
  
  private unsubscribe$ = new Subject<void>();
  private draft:Draft;
  public viewMyRequest: string = 'manifestations';

  constructor(
    private router: Router,
    private translate: TranslateService,
    private proceduresService: ProceduresService,
    private catalogService: CatalogsService,
    private activatedRoute:ActivatedRoute,
    private carpetaService:CarpetaService,
    private draftService:DraftsService,
    public appUtils: AppUtils,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    const idProcedure = sessionStorage.getItem('idProcedure');
    if (sessionStorage.getItem('company_type')) {
      let company_type;
      // ( sessionStorage.getItem('company_type') === ConceptConstants.REPRESENTATIVE_PHYSIC_AUTONOMOUS ||
      //   sessionStorage.getItem('company_type') === ConceptConstants.REPRESENTATIVE_COMMUNITY_OF_GOODS || 
      //   sessionStorage.getItem('company_type') === ConceptConstants.REPRESENTATIVE_CIVIL_SOCIETY) ?
      //   ConceptConstants.MANIFESTATIONS_TYPES_AUTO_COMBIENES : ConceptConstants.MANIFESTATIONS_TYPES_MICRO_PYME_GEMP;
        switch (sessionStorage.getItem('company_type')){
          case ConceptConstants.REPRESENTATIVE_PHYSIC_AUTONOMOUS:
              company_type = ConceptConstants.MANIFESTATIONS_TYPES_AUTONOMOUS;
            break;
          default:
            company_type = ConceptConstants.MANIFESTATIONS_TYPES_MICRO_PYME_GEMP;
        }
      this.catalogService.getCatalogByCode(company_type).pipe(
        takeUntil(this.unsubscribe$)
      ).pipe().subscribe(
        (data: Concept[]) => {
          this.manifestations = data.filter((dates)=>{
            return dates.concept_code !== 'manifestations-types-autonomous-07'
          });
        }
      )
    }

    this.getDataProtection();
    this.proceduresService.getProcedureById(idProcedure).pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe(
      (data:Procedure) => {
        this.procedure = data;
        this.getDraft();
      }
    )
    this.formAceptation = new FormGroup({});
  }

  private getDataProtection() {
    if(sessionStorage.getItem('company_type') === ConceptConstants.REPRESENTATIVE_PYME) {
      this.catalogService.getCatalogByCode(ConceptConstants.DATA_PROTECTION_QUESTIONARY_MANDATORY_PYME).subscribe(
        (data:Concept[]) => this.data_protection_mandatory = data
      )
      this.catalogService.getCatalogByCode(ConceptConstants.DATA_PROTECTION_QUESTIONARY_OPTIONAL_PYME).subscribe(
        (data:Concept[]) => this.data_protection_optional = data
      )
    } else {
      this.catalogService.getCatalogByCode(ConceptConstants.DATA_PROTECTION_QUESTIONARY_MANDATORY).subscribe(
        (data:Concept[]) => this.data_protection_mandatory = data
      )
      this.catalogService.getCatalogByCode(ConceptConstants.DATA_PROTECTION_QUESTIONARY_OPTIONAL).subscribe(
        (data:Concept[]) => this.data_protection_optional = data
      )
    }
  }

  private getDraft() {
    if(this.activatedRoute.snapshot.queryParams.draft) {
      this.draftService.getDraftById(this.activatedRoute.snapshot.queryParams.draft + ':forms:formAceptation').subscribe(
        (data:Draft) => {
          data !== null ? this.draft = data : this.setDraft();
          this.draftFormAceptation = JSON.parse(this.draft.info);
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

  public validateForm() {
    if (this.formAceptation.valid) {
      this.saveDraftAndNavigate();
    } else {
      this.translate.get('error_texts.pop_up.form_error').pipe(
        takeUntil(this.unsubscribe$)
      ).subscribe(
        error => {
          SwalUtils.showErrorAlert(
            error.title,
            error.text);
          this.validate = true;
        })
    }
  }

  private saveDraftAndNavigate() {
    const draft:Draft = new Draft(sessionStorage.getItem('nifTitular'), 'BORRADOR', JSON.stringify(this.formAceptation.value), this.procedure.category.name,
      this.draft.producto, 'forms:formAceptation', this.draft.key, '');

    this.draftService.saveDraft(draft).subscribe(
      () => this.router.navigate(['carpeta-del-ciudadano/firmar'], {
        queryParams: { draft: this.draft.key }
      })
    )    
  }

  openDialog(): void {
    this.dialog.open(Aceptation, {
      width: '1250px',
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
  return() {
    this.appUtils.return();
}
}
