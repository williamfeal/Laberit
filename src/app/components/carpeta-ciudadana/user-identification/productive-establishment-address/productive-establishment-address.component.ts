import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CatalogsService } from 'src/app/services/catalogs/catalogs.service';
import { SelectFieldObject } from 'src/app/shared/form/fields/input-select/input-select';
import { AppUtils } from 'src/app/utils/app-utils';
import { ConceptConstants } from 'src/app/utils/constants/concept-constants';


@Component({
  selector: 'app-productive-establishment-address',
  templateUrl: './productive-establishment-address.component.html'
})
export class ProductiveEstablishmentAddressComponent implements OnInit {

  @Input() formProductiveEstablishment: FormGroup;
  @Input() readOnly: boolean;
  @Input() validate: boolean = false;
  @Input() isRequired: boolean;


  public provincias: SelectFieldObject[];
  public municipios: SelectFieldObject[];
  public paises: SelectFieldObject[];
  public typeStreet:SelectFieldObject[];

  public errorCharacterLeng: string = 'empty_error';

  constructor(
    private catalogsService:CatalogsService
  ) { }

  ngOnInit(): void {
    this.getRoadTypes();
    this.getCountries();
    this.getSpainCountries();
  }
  
  public getRoadTypes() {
    this.catalogsService.getCatalogByCode(ConceptConstants.ROAD_TYPES).subscribe(
      data => this.typeStreet = AppUtils.sortConceptsAlphabetically(data)
    )
  }

  public getCountries() {
    this.catalogsService.getCatalogByCode(ConceptConstants.COUNTRIES).subscribe(
      data => this.paises = AppUtils.sortConceptsAlphabetically(data)
    )
  }

  public getSpainCountries() {
    this.catalogsService.getCatalogByCode(ConceptConstants.COUNTRIES_SPAIN).subscribe(
      data => this.provincias = AppUtils.sortConceptsAlphabetically(data)
    )
  }

  public onCountryChange(event) {
    this.catalogsService.getCatalogByCode(event).subscribe(
      data => this.municipios = AppUtils.sortConceptsAlphabetically(data)
    )
  }
}
