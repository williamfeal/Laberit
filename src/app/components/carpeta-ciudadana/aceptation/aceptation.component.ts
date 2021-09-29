import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
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

  public formAceptation:FormGroup;
  public validate:boolean = false;
  public procedure:Procedure;
  public manifestations:Concept[];
  public data_protection:Concept[];

  public AUTONOMOUS = ConceptConstants.REPRESENTATIVE_PERSON_AUTONOMOUS;
  public MICRO_BUSINESS = ConceptConstants.REPRESENTATIVE_MICRO_BUSINESS;
  public PYME = ConceptConstants.REPRESENTATIVE_PYME;
  public COMMUNITY_OF_GOODS = ConceptConstants.REPRESENTATIVE_COMMUNITY_OF_GOODS;
  public CIVIL_SOCIETY = ConceptConstants.REPRESENTATIVE_CIVIL_SOCIETY;
  public BIG_COMPANY = ConceptConstants.REPRESENTATIVE_BIG_COMPANY;

  constructor(
    private router:Router,
    private translate:TranslateService,
    private proceduresService:ProceduresService,
    private catalogService:CatalogsService
  ) { }

  ngOnInit(): void {
    const idProcedure = sessionStorage.getItem('idProcedure');
    if(sessionStorage.getItem('company_type')) {
      const company_type = (sessionStorage.getItem('company_type') === ConceptConstants.REPRESENTATIVE_PERSON_AUTONOMOUS || 
        sessionStorage.getItem('company_type') === ConceptConstants.REPRESENTATIVE_COMMUNITY_OF_GOODS || 
        sessionStorage.getItem('company_type') === ConceptConstants.REPRESENTATIVE_CIVIL_SOCIETY) ?
        ConceptConstants.MANIFESTATIONS_TYPES_AUTO_COMBIENES : ConceptConstants.MANIFESTATIONS_TYPES_MICRO_PYME_GEMP;
      this.catalogService.getCatalogByCode(company_type).subscribe(
        (data:Concept[]) => this.manifestations = data
      )
    }

    this.catalogService.getCatalogByCode(ConceptConstants.DATA_PROTECTION).subscribe(
      (data:Concept[]) => this.data_protection = data
    )


    this.proceduresService.getProcedureById(idProcedure).subscribe(
      data => this.procedure = data
    )
    this.formAceptation = new FormGroup({
      check_1: new FormControl('', Validators.requiredTrue),
      check_2: new FormControl('', Validators.requiredTrue),
      check_3: new FormControl('', Validators.requiredTrue),
      check_4: new FormControl('', Validators.requiredTrue),
      check_5: new FormControl('', Validators.requiredTrue),

    })
  }

  public validateForm() {
    if(this.formAceptation.valid) {
        this.router.navigate(['carpeta-del-ciudadano/firmar'])
    } else {
      this.translate.get('error_texts.pop_up.form_error').subscribe(
        error => {
            SwalUtils.showErrorAlert(
                error.title, 
                error.text);
            this.validate = true;
        }
    )

    }

  }
}
