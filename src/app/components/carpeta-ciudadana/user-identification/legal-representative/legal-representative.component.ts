import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CatalogsService } from 'src/app/services/catalogs/catalogs.service';
import { SelectFieldObject } from 'src/app/shared/form/fields/input-select/input-select';
import { AppUtils } from 'src/app/utils/app-utils';
import { ConceptConstants } from 'src/app/utils/constants/concept-constants';

@Component({
  selector: 'app-legal-representative',
  templateUrl: './legal-representative.component.html',
})
export class LegalRepresentativeComponent implements OnInit {

  @Input() formLegalRepresentative: FormGroup;
  @Input() readOnly: boolean;
  @Input() isRequired: boolean;
  @Input() validate: boolean;

  public errorCharacterLeng: string = 'empty_error';
  public errorNif: string = 'nif_error';
  
  public typeStreet:SelectFieldObject[];
  public provincias: SelectFieldObject[];
  public municipios: SelectFieldObject[];
  public paises: SelectFieldObject[];
  
  constructor(
    private catalogService:CatalogsService
  ) { }

  ngOnInit(): void {
    this.getRoadTypes();
    this.getCountries();
    this.getSpainCountries();
  }

  private getCountries() {
    this.catalogService.getCatalogByCode(ConceptConstants.COUNTRIES).subscribe(
      data => this.paises = AppUtils.sortConceptsAlphabetically(data)
    )
  }

  private getSpainCountries() {
    this.catalogService.getCatalogByCode(ConceptConstants.COUNTRIES_SPAIN).subscribe(
      data => this.provincias = AppUtils.sortConceptsAlphabetically(data)
    )
  }

  private getRoadTypes() {
    this.catalogService.getCatalogByCode(ConceptConstants.ROAD_TYPES).subscribe(
      data => this.typeStreet = AppUtils.sortConceptsAlphabetically(data)
    )
  }

  public onChangeSpainCountry(event) {
    this.catalogService.getCatalogByCode(event).subscribe(
      data => this.municipios = AppUtils.sortConceptsAlphabetically(data)
    )
  }

}
