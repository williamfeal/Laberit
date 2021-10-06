import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CatalogsService } from 'src/app/services/catalogs/catalogs.service';
import { SelectFieldObject } from 'src/app/shared/form/fields/input-select/input-select';
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

  private unsubscribe$ = new Subject<void>();

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
    this.catalogsService.getCatalogByCode(ConceptConstants.APPLICANT_TYPES).pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe(
      data => this.actuation = data
    )
  }

  getRepresentativeTypes() {
    this.catalogsService.getCatalogByCode(ConceptConstants.REPRESENTATIVE_TYPES).pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe(
      data => this.representation_power = data
    )
  }
  comprobar(){
  }
ngOnDestroy(): void {
  this.unsubscribe$.next();
  this.unsubscribe$.complete();
}
}
