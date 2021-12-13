import { AppConstants } from 'src/app/utils/constants/app-constants';
import { AppUtils } from 'src/app/utils/app-utils';
import { CatalogsService } from 'src/app/services/catalogs/catalogs.service';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges
  } from '@angular/core';
import { ConceptConstants } from 'src/app/utils/constants/concept-constants';
import { FormGroup } from '@angular/forms';
import { isEmptyObject } from 'jquery';
import { LanguagesService } from './../../../../services/moges-services/language.service';
import { Procedure } from 'src/app/models/procedure.model';
import { SelectFieldObject } from 'src/app/shared/form/fields/input-select/input-select';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-interested-data',
  templateUrl: './interested-data.component.html'
})
export class InterestedDataComponent implements OnInit, OnChanges {

  @Input() formInterestedData:FormGroup;
  @Input() readOnly:boolean;
  @Input() validate: boolean;
  @Input() isRequired:boolean;
  @Input() draft:any;
  @Input() procedure:Procedure;
  
  @Output() public businessTypeOutput = new EventEmitter<string>();

  public genders:SelectFieldObject[];
  public paises: SelectFieldObject[];
  public belongingCompany:SelectFieldObject[];
  public cnae: SelectFieldObject[];
  public businessType: SelectFieldObject[];
  public autonomType: SelectFieldObject[];
  public siNo: SelectFieldObject[];
  public draftInterestedData;
  public comunidadBienes: boolean = false;
  public autonom: string;

  errorCharacterLeng: string = 'empty_error';
  errorNif: string = 'nif_error';
  private unsubscribe$ = new Subject<void>();
  
  constructor(
    private catalogsService:CatalogsService,
    private languageService:LanguagesService
  ) { }

  ngOnInit(): void {
    this.businessType = [{
      concept_code:'ivf-representative-types-physical-person-autonomous',
      description:'Autónomo',
      selected: true
    }];
    
    sessionStorage.setItem('company_type', ConceptConstants.REPRESENTATIVE_PHYSIC_AUTONOMOUS)
    // sessionStorage.getItem('company_type') === ConceptConstants.REPRESENTATIVE_COMMUNITY_OF_GOODS ? this.comunidadBienes = true : this.comunidadBienes = false;
    this.loadData();
    this.languageService.lang.subscribe(
      () => this.loadData()
    )
  }

  private loadData() {
    this.loadCNAEdata();
    this.getCountries()
    this.getGendersData();
    this.getBelongingCompany();
  }

  ngOnChanges(changes:SimpleChanges) {
    if(changes.draft && this.draft) {
      this.draftInterestedData = this.draft.interested_data;
      if(!isEmptyObject(this.draftInterestedData.businessType)) {
        this.businessTypeOutput.emit(this.draftInterestedData.businessType);
        sessionStorage.setItem('company_type', this.draftInterestedData.businessType);
      }
    }
  }

  public representativeTypeChange() {
    this.catalogsService.getCatalogByCode(ConceptConstants.REPRESENTATIVE_TYPES_JURIDIC_PERSON).pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe(
      data => this.businessType = AppUtils.sortConceptsAlphabetically(data)
    )
  }

  private loadCNAEdata() {
    switch(sessionStorage.getItem('idProcedure')) {
      case AppConstants.LINEA_RESISTIR_CODE:
        this.catalogsService.getCatalogByCode(ConceptConstants.CNAE_CODES_LINEA_RESISTIR).pipe(
          takeUntil(this.unsubscribe$)
        ).subscribe(
          data => this.cnae = AppUtils.sortConceptsAlphabetically(data)
        )
        break;
      default:
        this.catalogsService.getCatalogByCode(ConceptConstants.CNAE_CODES).pipe(
          takeUntil(this.unsubscribe$)
        ).subscribe(
          data => this.cnae = AppUtils.sortConceptsAlphabetically(data)
        )
    }
    
  }

  private getCountries() {
    this.catalogsService.getCatalogByCode(ConceptConstants.COUNTRIES).pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe(
      data =>  this.paises = AppUtils.sortConceptsAlphabetically(data)
      
    )
  }

  private getGendersData() {
    this.catalogsService.getCatalogByCode(ConceptConstants.GENDERS).pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe(
      data => this.genders = data
    )
  }

  private getBelongingCompany() {
    this.catalogsService.getCatalogByCode(ConceptConstants.GROUP_BELONGING_COMPANY).pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe(
      data => this.belongingCompany = data
    )
  }

  public businessTypeChange(event) {
    this.businessTypeOutput.emit(event);
    this.autonom = event;
    sessionStorage.setItem('company_type', event);
    sessionStorage.getItem('company_type') === ConceptConstants.REPRESENTATIVE_COMMUNITY_OF_GOODS ? this.comunidadBienes = true : this.comunidadBienes = false;
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
