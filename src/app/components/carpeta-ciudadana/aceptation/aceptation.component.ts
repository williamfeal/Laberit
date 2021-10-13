import { ActivatedRoute, Router } from '@angular/router';
import { CarpetaService } from 'src/app/services/trex-service/carpeta.service';
import { CatalogsService } from 'src/app/services/catalogs/catalogs.service';
import { Component, OnInit } from '@angular/core';
import { Concept } from 'src/app/models/concept.model';
import { ConceptConstants } from 'src/app/utils/constants/concept-constants';
import { Draft } from 'src/app/models/draft.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { of, Subject } from 'rxjs';
import { Procedure } from 'src/app/models/procedure.model';
import { ProceduresService } from 'src/app/services/moges-services/procedures.service';
import { SwalUtils } from 'src/app/utils/swal-utils';
import { takeUntil } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';

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
  public data_protection: Concept[];
  
  public isRequired = true;
  public draftFormAceptation;
  
  private unsubscribe$ = new Subject<void>();
  private draft:Draft;

  constructor(
    private router: Router,
    private translate: TranslateService,
    private proceduresService: ProceduresService,
    private catalogService: CatalogsService,
    private activatedRoute:ActivatedRoute,
    private carpetaService:CarpetaService
  ) { }

  ngOnInit(): void {
    const idProcedure = sessionStorage.getItem('idProcedure');
    if (sessionStorage.getItem('company_type')) {
      const company_type = (sessionStorage.getItem('company_type') === ConceptConstants.REPRESENTATIVE_PERSON_AUTONOMOUS ||
        sessionStorage.getItem('company_type') === ConceptConstants.REPRESENTATIVE_COMMUNITY_OF_GOODS ||
        sessionStorage.getItem('company_type') === ConceptConstants.REPRESENTATIVE_CIVIL_SOCIETY) ?
        ConceptConstants.MANIFESTATIONS_TYPES_AUTO_COMBIENES : ConceptConstants.MANIFESTATIONS_TYPES_MICRO_PYME_GEMP;
      this.catalogService.getCatalogByCode(company_type).pipe(
        takeUntil(this.unsubscribe$)
      ).pipe().subscribe(
        (data: Concept[]) => this.manifestations = data
      )
    }

    this.catalogService.getCatalogByCode(ConceptConstants.DATA_PROTECTION).pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe(
      (data: Concept[]) => this.data_protection = data
    )


    this.proceduresService.getProcedureById(idProcedure).pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe(
      data => this.procedure = data
    )
    this.formAceptation = new FormGroup({});
    this.getDraft();
  }

  private getDraft() {
    if(this.activatedRoute.snapshot.queryParams.draft) {
      this.carpetaService.getDraftById(this.activatedRoute.snapshot.queryParams.draft).subscribe(
        (data:Draft) => {
          this.draft = data;
          if(JSON.parse(this.draft.info).formAceptation) this.draftFormAceptation = JSON.parse(this.draft.info).formAceptation;
        })
    }
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
        }
      )
    }
  }

  private saveDraftAndNavigate() {
    if(this.draft) {
      const infoJSON = JSON.parse(this.draft.info);
      infoJSON.formAceptation = this.formAceptation.value;

      this.draft.info = JSON.stringify(infoJSON);
      this.carpetaService.saveDraft(this.draft).subscribe(
          () => this.router.navigate(['carpeta-del-ciudadano/firmar'], { queryParams: { draft: this.draft.key }})
      )
  } else {
    this.router.navigate(['carpeta-del-ciudadano/firmar'])
  }     
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
