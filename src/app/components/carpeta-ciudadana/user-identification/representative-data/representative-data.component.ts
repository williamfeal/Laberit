import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { isEmptyObject } from 'jquery';
import { Draft } from 'src/app/models/draft.model';
import { pipe, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CatalogsService } from 'src/app/services/catalogs/catalogs.service';
import { SelectFieldObject } from 'src/app/shared/form/fields/input-select/input-select';
import { AppUtils } from 'src/app/utils/app-utils';
import { ConceptConstants } from 'src/app/utils/constants/concept-constants';

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
  @Input() draft:Draft;

  errorCharacterLeng: string = 'empty_error';
  errorNif: string = 'nif_error';

  public businessType: SelectFieldObject[];
  public representativeTypes: SelectFieldObject[];
  public belongingCompany:SelectFieldObject[];
  public countries:SelectFieldObject[];
  public genders:SelectFieldObject[];
  public cnaeOptions:SelectFieldObject[];
  
  public representativeTypeSelected;
  public businessTypeSelected;
  public draftRepresentativeData;

  private unsubscribe$ = new Subject<void>();

  constructor(
    private catalogService:CatalogsService
  ) { }

  ngOnInit(): void {
    this.getRepresentativeType();
    this.getBelongingCompany();
    this.getCountries();
    this.getGenders();
    this.getCNAEoptions();
  }

  ngOnChanges(changes:SimpleChanges) {
    if(changes.draft && this.draft) {
      this.draftRepresentativeData = JSON.parse(this.draft.info).representative_data;
      if(!isEmptyObject(this.draftRepresentativeData.representativeTypes)) {
        this.representativeTypeChange(this.draftRepresentativeData.representativeTypes);
      }
    }
  }


  public isJuridicPerson() {
    return this.representativeTypeSelected === ConceptConstants.REPRESENTATIVE_TYPES_JURIDIC_PERSON;
  }

  public representativeTypeChange(event: string) {
    this.representativeTypeSelected = event;
    this.catalogService.getCatalogByCode(ConceptConstants.REPRESENTATIVE_TYPES_JURIDIC_PERSON).pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe(
      data => this.businessType = AppUtils.sortConceptsAlphabetically(data)
    )
  }

  private getCNAEoptions() {
    this.catalogService.getCatalogByCode(ConceptConstants.CNAE_CODES).pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe(
      data => this.cnaeOptions = AppUtils.sortConceptsAlphabetically(data)
    )
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
  }

  public isAutonum() {
    return this.businessTypeSelected === ConceptConstants.REPRESENTATIVE_PERSON_AUTONOMOUS
  }
  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
