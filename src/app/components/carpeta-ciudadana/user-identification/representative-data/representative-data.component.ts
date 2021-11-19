import { AppConstants } from 'src/app/utils/constants/app-constants';
import { AppUtils } from 'src/app/utils/app-utils';
import { CatalogsService } from 'src/app/services/catalogs/catalogs.service';
import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges
  } from '@angular/core';
import { ConceptConstants } from 'src/app/utils/constants/concept-constants';
import { FormGroup } from '@angular/forms';
import { isEmptyObject } from 'jquery';
import { LanguagesService } from './../../../../services/moges-services/language.service';
import { SelectFieldObject } from 'src/app/shared/form/fields/input-select/input-select';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-representative-data',
  templateUrl: './representative-data.component.html'
})
export class RepresentativeDataComponent implements OnInit, OnChanges {

  @Input() formRepresentativeData: FormGroup;
  @Input() readOnly: boolean;
  @Input() validate: boolean;
  @Input() isRequired: boolean;
  @Input() negativos: boolean = true;
  @Input() draft:any;

  errorCharacterLeng: string = 'empty_error';
  errorNif: string = 'nif_error';

  public businessType: SelectFieldObject[];
  public representativeTypes: SelectFieldObject[];
  public belongingCompany:SelectFieldObject[];
  public countries:SelectFieldObject[];
  public genders:SelectFieldObject[];
  public cnaeOptions:SelectFieldObject[];
  public comunidadBienes: boolean = false;

  public representativeTypeSelected;
  public businessTypeSelected;
  public draftRepresentativeData;

  
  private unsubscribe$ = new Subject<void>();

  constructor(
    private catalogService:CatalogsService,
    private languageService:LanguagesService
  ) { }

  ngOnInit(): void {
    sessionStorage.getItem('company_type') === ConceptConstants.REPRESENTATIVE_COMMUNITY_OF_GOODS || 
    sessionStorage.getItem('company_type') === ConceptConstants.REPRESENTATIVE_COMMUNITY_OF_GOODS ? this.comunidadBienes = true : this.comunidadBienes = false;
    this.loadData();
    this.languageService.lang.subscribe(
      () => this.loadData()
    )
  }
  
  private loadData() {
    this.getRepresentativeType();
    this.getBelongingCompany();
    this.getCountries();
    this.getGenders();
    this.getCNAEoptions();
  }

  ngOnChanges(changes:SimpleChanges) {
    if(changes.draft && this.draft) {
      this.draftRepresentativeData = this.draft.representative_data;
      if(!isEmptyObject(this.draftRepresentativeData.representativeTypes)) {
        this.representativeTypeChange(this.draftRepresentativeData.representativeTypes);
      }
      if(!isEmptyObject(this.draftRepresentativeData.businessType)) {
        sessionStorage.setItem('company_type', this.draftRepresentativeData.businessType);
      }
    }
  }

  public showRepresentaBtn():boolean {
    return sessionStorage.getItem('nifTitular') !== this.formRepresentativeData.value.represented_data_nif;
  
  }

  public isJuridicPerson() {
    return this.representativeTypeSelected === ConceptConstants.REPRESENTATIVE_TYPES_JURIDIC_PERSON;
  }

  public representativeTypeChange(event: string) {
    this.representativeTypeSelected = event;
  
    this.catalogService.getCatalogByCode(this.representativeTypeSelected).pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe(
      data => this.businessType = AppUtils.sortConceptsAlphabetically(data)
    )
  }

  private getCNAEoptions() {
    switch(sessionStorage.getItem('idProcedure')) {
      case AppConstants.LINEA_RESISTIR_CODE:
        this.catalogService.getCatalogByCode(ConceptConstants.CNAE_CODES_LINEA_RESISTIR).pipe(
          takeUntil(this.unsubscribe$)
        ).subscribe(
          data => this.cnaeOptions = AppUtils.sortConceptsAlphabetically(data)
        )
        break;
      default:
        this.catalogService.getCatalogByCode(ConceptConstants.CNAE_CODES).pipe(
          takeUntil(this.unsubscribe$)
        ).subscribe(
          data => this.cnaeOptions = AppUtils.sortConceptsAlphabetically(data)
        )
    }
  }

  private getRepresentativeType() {
    this.catalogService.getCatalogByCode(ConceptConstants.REPRESENTATIVE_TYPES).pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe(
      data => this.representativeTypes = AppUtils.sortConceptsAlphabetically(data)
    )
  }

  private getBelongingCompany() {
    this.catalogService.getCatalogByCode(ConceptConstants.GROUP_BELONGING_COMPANY).pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe(
      data => this.belongingCompany = data
    )
  }

  private getCountries() {
    this.catalogService.getCatalogByCode(ConceptConstants.COUNTRIES).pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe(
      data => this.countries = AppUtils.sortConceptsAlphabetically(data)
    )
  }
  
  private getGenders() {
    this.catalogService.getCatalogByCode(ConceptConstants.GENDERS).pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe(
      data => this.genders = data
    )
  }

  public businessTypeChange(event: string) {
    this.businessTypeSelected = event;
    sessionStorage.setItem('company_type', event);
    sessionStorage.getItem('company_type') === ConceptConstants.REPRESENTATIVE_COMMUNITY_OF_GOODS || 
    sessionStorage.getItem('company_type') === ConceptConstants.REPRESENTATIVE_COMMUNITY_OF_GOODS ? this.comunidadBienes = true : this.comunidadBienes = false;
  }

  public isAutonum() {
    return this.businessTypeSelected === ConceptConstants.REPRESENTATIVE_PHYSIC_AUTONOMOUS
  }

  public callRepresenta() {

  }
  
  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
