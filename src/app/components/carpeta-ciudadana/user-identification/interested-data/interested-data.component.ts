import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Draft } from 'src/app/models/draft.model';
import { CatalogsService } from 'src/app/services/catalogs/catalogs.service';
import { SelectFieldObject } from 'src/app/shared/form/fields/input-select/input-select';
import { AppUtils } from 'src/app/utils/app-utils';
import { ConceptConstants } from 'src/app/utils/constants/concept-constants';

@Component({
  selector: 'app-interested-data',
  templateUrl: './interested-data.component.html'
})
export class InterestedDataComponent implements OnInit, OnChanges {

  @Input() formInterestedData:FormGroup;
  @Input() readOnly:boolean;
  @Input() validate: boolean;
  @Input() isRequired:boolean;
  @Input() draft:Draft;

  public genders:SelectFieldObject[];
  public paises: SelectFieldObject[];
  public belongingCompany:SelectFieldObject[];
  public cnae: SelectFieldObject[];
  public businessType: SelectFieldObject[];
  public siNo: SelectFieldObject[];
  public draftInterestedData;

  errorCharacterLeng: string = 'empty_error';
  errorNif: string = 'nif_error';

  
  constructor(
    private catalogsService:CatalogsService
  ) { }

  ngOnInit(): void {
    this.loadCNAEdata();
    this.getCountries()
    this.getGendersData();
    this.getBelongingCompany();
    this.representativeTypeChange();
  }

  ngOnChanges(changes:SimpleChanges) {
    if(changes.draft && this.draft) {
      this.draftInterestedData = JSON.parse(this.draft.info).interested_data;
    }
  }

  public representativeTypeChange() {
    this.catalogsService.getCatalogByCode(ConceptConstants.REPRESENTATIVE_TYPES_JURIDIC_PERSON).subscribe(
      data => this.businessType = AppUtils.sortConceptsAlphabetically(data)
    )
  }

  private loadCNAEdata() {
    this.catalogsService.getCatalogByCode(ConceptConstants.CNAE_CODES).subscribe(
      data => this.cnae = AppUtils.sortConceptsAlphabetically(data)
    )
  }

  private getCountries() {
    this.catalogsService.getCatalogByCode(ConceptConstants.COUNTRIES).subscribe(
      data =>  this.paises = AppUtils.sortConceptsAlphabetically(data)
      
    )
  }

  private getGendersData() {
    this.catalogsService.getCatalogByCode(ConceptConstants.GENDERS).subscribe(
      data => this.genders = data
    )
  }

  private getBelongingCompany() {
    this.catalogsService.getCatalogByCode(ConceptConstants.GROUP_BELONGING_COMPANY).subscribe(
      data => this.belongingCompany = data
    )
  }

  public businessTypeChange(event) {
    sessionStorage.setItem('company_type', event);
  }
}
