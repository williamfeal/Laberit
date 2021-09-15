import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CatalogsService } from 'src/app/services/catalogs/catalogs.service';
import { SelectFieldObject } from 'src/app/shared/form/fields/input-select/input-select';
import { businessTypeWithoutAutonomo, personType, siNo, genero, paises, businessType } from 'src/app/utils/constants/app-constants';
import { ConceptConstants } from 'src/app/utils/constants/concept-constants';

@Component({
  selector: 'app-representative-data',
  templateUrl: './representative-data.component.html'
})
export class RepresentativeDataComponent implements OnInit {

  @Input() formRepresentativeData: FormGroup;
  @Input() readOnly: boolean;
  @Input() validate: boolean;
  @Input() isRequired: boolean;
  errorCharacterLeng: string = 'empty_error';
  errorNif: string = 'nif_error';
  public type = 'natural-person';


  public businessType: SelectFieldObject[];
  public representativeTypes: SelectFieldObject[];
  public belongingCompany:SelectFieldObject[];
  public countries:SelectFieldObject[];
  public genders:SelectFieldObject[];
  public cnaeOptions:SelectFieldObject[];

  public businessTypeSelected;

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

  public representativeTypeChange(event: string) {
    this.catalogService.getCatalogByCode('ivf-representative-types-juridic-person').subscribe(
      data => this.businessType = data
    )
  }

  private getCNAEoptions() {
    this.catalogService.getCatalogByCode(ConceptConstants.CNAE_CODES).subscribe(
      data => this.cnaeOptions = data
    )
  }

  private getRepresentativeType() {
    this.catalogService.getCatalogByCode(ConceptConstants.REPRESENTATIVE_TYPES).subscribe(
      data => this.representativeTypes = data
    )
  }

  private getBelongingCompany() {
    this.catalogService.getCatalogByCode(ConceptConstants.GROUP_BELONGING_COMPANY).subscribe(
      data => this.belongingCompany = data
    )
  }

  private getCountries() {
    this.catalogService.getCatalogByCode(ConceptConstants.COUNTRIES).subscribe(
      data => this.countries = data
    )
  }
  
  private getGenders() {
    this.catalogService.getCatalogByCode(ConceptConstants.GENDERS).subscribe(
      data => this.genders = data
    )
  }

  public businessTypeChange(event: string) {
    this.businessTypeSelected = event;
  }

  public isAutonum() {
    return this.businessTypeSelected === 'ivf-representative-types-juridic-person-autonomous'

  }
}
