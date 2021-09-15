import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CatalogsService } from 'src/app/services/catalogs/catalogs.service';
import { SelectFieldObject } from 'src/app/shared/form/fields/input-select/input-select';
import {  representation_power } from 'src/app/utils/constants/app-constants';
import { ConceptConstants } from 'src/app/utils/constants/concept-constants';

@Component({
  selector: 'app-requester-data',
  templateUrl: './requester-data.component.html'
})
export class RequesterDataComponent implements OnInit {

  @Input() formRequestData: FormGroup;
  @Input() validate: boolean;
  errorCharacterLeng: string = 'empty_error';

  public type = 'interested'; ///ES POSIBLE QUE FALTE AÑADIR EL FORM
  public actuation: SelectFieldObject[];
  public representation_power:SelectFieldObject[];

  @Output() public typeOutput = new EventEmitter<string>();

  constructor(
    private catalogsService:CatalogsService
  ) { }

  ngOnInit(): void {
    this.getApplicantTypes();
    this.getRepresentativeTypes();
  }

  onChangeType(event: string) {
    this.type = event;
    this.typeOutput.emit(this.type);
  }

  getApplicantTypes() {
    this.catalogsService.getCatalogByCode(ConceptConstants.APPLICANT_TYPES).subscribe(
      data => this.actuation = data
    )
  }

  getRepresentativeTypes() {
    this.catalogsService.getCatalogByCode(ConceptConstants.REPRESENTATIVE_TYPES).subscribe(
      data => this.representation_power = data
    )
  }

}
