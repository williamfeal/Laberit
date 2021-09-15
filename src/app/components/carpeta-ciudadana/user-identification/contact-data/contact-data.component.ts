import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CatalogsService } from 'src/app/services/catalogs/catalogs.service';
import { SelectFieldObject } from 'src/app/shared/form/fields/input-select/input-select';
import { businessType, siNo, genero, typeStreet, provincias, comunidades, paises } from 'src/app/utils/constants/app-constants';
import { ConceptConstants } from 'src/app/utils/constants/concept-constants';

@Component({
  selector: 'app-contact-data',
  templateUrl: './contact-data.component.html',
  styleUrls: ['./contact-data.component.scss']
})
export class ContactDataComponent implements OnInit {

  @Input() formContactData: FormGroup;
  @Input() readOnly: boolean;
  @Input() interesado: boolean;
  @Input() validate: boolean;
  public errorCharacterLeng: string = 'empty_error';
  public errorNif: string = 'nif_error';
  public isChecked: boolean;
  public showInputs: boolean = true;

  //se cambiara con los catalogos
  public provincias: SelectFieldObject[];
  public municipios: SelectFieldObject[];
  public paises: SelectFieldObject[];
  
  typeStreet = typeStreet;
  constructor(
    private catalogService:CatalogsService
  ) { }

  ngOnInit(): void {
    this.getCountries();
    this.getSpainCountries();
  }

  private getCountries() {
    this.catalogService.getCatalogByCode(ConceptConstants.COUNTRIES).subscribe(
      data => this.paises = data
    )
  }

  private getSpainCountries() {
    this.catalogService.getCatalogByCode(ConceptConstants.COUNTRIES_SPAIN).subscribe(
      data => this.provincias = data
    )
  }

  public onChangeSpainCountry(event) {
    this.catalogService.getCatalogByCode(event).subscribe(
      data => this.municipios = data
    )
  }

  public checkValue() {
    console.log(this.isChecked)
  }
  
}
