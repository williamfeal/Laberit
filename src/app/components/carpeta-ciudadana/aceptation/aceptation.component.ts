import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Concept } from 'src/app/models/concept.model';
import { Procedure } from 'src/app/models/procedure.model';
import { CatalogsService } from 'src/app/services/catalogs/catalogs.service';
import { ProceduresService } from 'src/app/services/moges-services/procedures.service';
import { ConceptConstants } from 'src/app/utils/constants/concept-constants';
import { SwalUtils } from 'src/app/utils/swal-utils';

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

  private unsubscribe$ = new Subject<void>();

  constructor(
    private router: Router,
    private translate: TranslateService,
    private proceduresService: ProceduresService,
    private catalogService: CatalogsService
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
  }

  public validateForm() {
    if (this.formAceptation.valid) {
      this.router.navigate(['carpeta-del-ciudadano/firmar'])
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
  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
