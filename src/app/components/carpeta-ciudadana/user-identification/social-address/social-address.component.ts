import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { isEmptyObject } from 'jquery';
import { Draft } from 'src/app/models/draft.model';
import { CatalogsService } from 'src/app/services/catalogs/catalogs.service';
import { SelectFieldObject } from 'src/app/shared/form/fields/input-select/input-select';
import { AppUtils } from 'src/app/utils/app-utils';
import { ConceptConstants } from 'src/app/utils/constants/concept-constants';

@Component({
  selector: 'app-social-address',
  templateUrl: './social-address.component.html'
})
export class SocialAddressComponent implements OnInit {

  @Input() formSocialAdress: FormGroup;
  @Input() validate: boolean;
  @Input() isRequired: boolean;
  @Input() draft:Draft;
  
  public provincias: SelectFieldObject[];
  public municipios: SelectFieldObject[];
  public paises: SelectFieldObject[];
  public typeStreet: SelectFieldObject[];

  public countriesSpain = ConceptConstants.COUNTRIES_SPAIN;

  public countrySpainSelected;
  public countrySelected;
  public draftSocialAddressData;

  errorCharacterLeng: string = 'empty_error';
  
  constructor(
    private catalogService:CatalogsService
  ) { }

  ngOnInit(): void {
    this.getRoadTypes();
    this.getCountries();
  }

  ngOnChanges(changes:SimpleChanges) {
    if(changes.draft && this.draft) {
      this.draftSocialAddressData = JSON.parse(this.draft.info).sosial_address;
      console.log(this.draftSocialAddressData)
      if(!isEmptyObject(this.draftSocialAddressData.social_country)) {
        this.countrySelected = this.draftSocialAddressData.social_country;
        if(!isEmptyObject(this.draftSocialAddressData.social_province)) {
          this.countrySpainSelected = this.draftSocialAddressData.social_province;
          this.onChangeSpainCountry(this.countrySpainSelected);
        }
      }
    }
  }

  public getRoadTypes() {
    this.catalogService.getCatalogByCode(ConceptConstants.ROAD_TYPES).subscribe(
      data => this.typeStreet = AppUtils.sortConceptsAlphabetically(data)
    )
  }

  public getCountries() {
    this.catalogService.getCatalogByCode(ConceptConstants.COUNTRIES).subscribe(
      data => {
        this.paises = AppUtils.sortConceptsAlphabetically(data)
        this.getSpainCountries()
      }
    )
  }

  public getSpainCountries() {
    this.catalogService.getCatalogByCode(ConceptConstants.COUNTRIES_SPAIN).subscribe(
      data => this.provincias = AppUtils.sortConceptsAlphabetically(data)
    )
  }

  public onChangeSpainCountry(event) {
    this.catalogService.getCatalogByCode(event).subscribe(
      data => this.municipios = AppUtils.sortConceptsAlphabetically(data),
      () => this.municipios = []
    )
  }

  public onChangeCountry(event) {
    this.countrySelected = event;
  }

}
