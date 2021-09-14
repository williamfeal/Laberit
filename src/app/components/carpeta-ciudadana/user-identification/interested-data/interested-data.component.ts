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
  public selectInfo:SelectFieldObject[];
  public paises: SelectFieldObject[];

  errorCharacterLeng: string = 'empty_error';
  errorNif: string = 'nif_error';
   
  public businessType: SelectFieldObject[];
  public siNo: SelectFieldObject[];
  
  constructor(
    private catalogsService:CatalogsService
  ) { }

  ngOnInit(): void {
    this.loadCNAEdata();
    this.getCountries()
    this.businessType = businessType;
    this.siNo = siNo;
  }

  private loadCNAEdata() {
    this.catalogsService.getConceptByCode(ConceptConstants.CNAE_CODES).subscribe(
      data => console.log(data)
    )
  }

  private getCountries() {
    this.catalogsService.getCatalogByCode(ConceptConstants.COUNTRIES).subscribe(
      data =>  this.paises = data
      
    )
  }
}
