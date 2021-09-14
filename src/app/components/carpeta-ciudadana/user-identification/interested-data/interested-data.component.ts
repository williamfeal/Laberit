import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CatalogsService } from 'src/app/services/catalogs/catalogs.service';
import { SelectFieldObject } from 'src/app/shared/form/fields/input-select/input-select';
import { businessType, siNo, genero, paises } from 'src/app/utils/constants/app-constants';
import { ConceptConstants } from 'src/app/utils/constants/concept-constants';

@Component({
  selector: 'app-interested-data',
  templateUrl: './interested-data.component.html'
})
export class InterestedDataComponent implements OnInit {

  @Input() formInterestedData:FormGroup;
  @Input() readOnly:boolean;
  @Input() validate: boolean;
  @Input() isRequired:boolean;
  
  public genders:SelectFieldObject[];
  public paises: SelectFieldObject[];
  public belongingCompany:SelectFieldObject[];
  public businessType: SelectFieldObject[];
  public siNo: SelectFieldObject[];

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
  }

  private loadCNAEdata() {
    this.catalogsService.getCatalogByCode(ConceptConstants.CNAE_CODES).subscribe(
      data => this.businessType = data.sort(function(a, b){
        if(a.description < b.description) { return -1; }
        if(a.description > b.description) { return 1; }
        return 0;
    })
    )
  }

  private getCountries() {
    this.catalogsService.getCatalogByCode(ConceptConstants.COUNTRIES).subscribe(
      data =>  this.paises = data.sort(function(a, b){
        if(a.description < b.description) { return -1; }
        if(a.description > b.description) { return 1; }
        return 0;
    })
      
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
}
