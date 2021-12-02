import {
  AfterViewChecked,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
  SimpleChanges
  } from '@angular/core';
import { AppUtils } from 'src/app/utils/app-utils';
import { CatalogsService } from 'src/app/services/catalogs/catalogs.service';
import { ConceptConstants } from 'src/app/utils/constants/concept-constants';
import { Draft } from 'src/app/models/draft.model';
import { FormGroup } from '@angular/forms';
import { isEmptyObject } from 'jquery';
import { SelectFieldObject } from 'src/app/shared/form/fields/input-select/input-select';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { tipoProyecto } from 'src/app/utils/constants/app-constants';

@Component({
    selector: 'app-detail-cost-financed',
    templateUrl: 'detail-cost-financed.component.html'
})

export class DetailCostFinancedComponent implements OnInit {

    @Input() formLineaResistir: FormGroup;
    @Input() validate: boolean;
    @Input() draft:Draft;
    public provincias: SelectFieldObject[];
    public municipios: SelectFieldObject[];
    public paises: SelectFieldObject[];
    public province: string;
    //se bebera de los catalogos
    private unsubscribe$ = new Subject<void>();
    public countrySpainSelected;
    public countrySelected;
    public countriesSpain = ConceptConstants.COUNTRIES_SPAIN;

    public showInversion = false;
    public showCirculante = false;
    public showInvCircu = false;

    public project_type: SelectFieldObject[];
    public pro: string = '';

    public errorCharacterLeng: string = 'empty_error';

    public draftDetailCostFinanced;

    constructor(
        private ref: ChangeDetectorRef,
        private catalogsService: CatalogsService
    ) { }

    ngOnChanges(changes:SimpleChanges) {
        if(changes.draft && !isEmptyObject(this.draft) && JSON.parse(this.draft.info)) {
            this.draftDetailCostFinanced = JSON.parse(this.draft.info);
            if(!isEmptyObject(this.draftDetailCostFinanced.project_type)) {
                this.pro = this.draftDetailCostFinanced.project_type;
                this.capturarCampo(this.draftDetailCostFinanced.project_type, 'pro');
            }
            if(!isEmptyObject(this.draftDetailCostFinanced.social_country)) {
              this.countrySelected = this.draftDetailCostFinanced.social_country;
              if(!isEmptyObject(this.draftDetailCostFinanced.social_province)) {
                this.countrySpainSelected = this.draftDetailCostFinanced.social_province;
                this.onChangeSpainCountry(this.countrySpainSelected);
              }
            }
        }
        this.ref.detectChanges();

    }

    ngOnInit() { 
        this.getApplicantTypes();
        this.getCountries();
    }

    private getApplicantTypes() {
        this.catalogsService.getCatalogByCode(ConceptConstants.DETAIL_TYPE_PROJECT).pipe(
          takeUntil(this.unsubscribe$)
        ).subscribe(
          data => this.project_type = data
        )
    }

    public capturarCampo(ev, campo) {
        this[campo] = ev;
        if (campo == 'pro') {
            switch (this.pro) {
                case 'linea-resistir-project-type-G1-investment':
                    this.showInversion = true;
                    this.showCirculante = false;
                    break;
                case 'linea-resistir-project-type-G2-circulating':
                    this.showInversion = false;
                    this.showCirculante = true;
                    break;
                case 'linea-resistir-project-type-G3-investment-and-circulating':
                    this.showInversion = true;
                    this.showCirculante = true;
                    break;
                default:
                    break;
            }
            this.ref.detectChanges();
        }
    }
    
    public onChangeCountry(event) {
        this.countrySelected = event;
        this.getSpainCountries();
    }

    public getCountries() {
      this.catalogsService.getCatalogByCode(ConceptConstants.COUNTRIES).pipe(
        takeUntil(this.unsubscribe$)
      ).subscribe(
        data => {
          this.paises = AppUtils.sortConceptsAlphabetically(data)
          this.getSpainCountries()
        }
      )
    }
    
    public getSpainCountries() {
      this.catalogsService.getCatalogByCode(ConceptConstants.COUNTRIES_SPAIN).pipe(
        takeUntil(this.unsubscribe$)
      ).subscribe(
        data => this.provincias = AppUtils.sortConceptsAlphabetically(data)
      )
    }
  
    public onChangeSpainCountry(event) {
      this.province = event;
      this.catalogsService.getCatalogByCode(event).pipe(
        takeUntil(this.unsubscribe$)
      ).subscribe(
        data => this.municipios = AppUtils.sortConceptsAlphabetically(data),
        () => this.municipios = []
      )
    }
  

    ngOnDestroy(): void {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
      }

}