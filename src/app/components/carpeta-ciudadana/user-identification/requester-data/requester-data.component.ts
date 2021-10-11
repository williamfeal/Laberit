import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChange, SimpleChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { isEmptyObject } from 'jquery';
import { Draft } from 'src/app/models/draft.model';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CatalogsService } from 'src/app/services/catalogs/catalogs.service';
import { SelectFieldObject } from 'src/app/shared/form/fields/input-select/input-select';
import { ConceptConstants } from 'src/app/utils/constants/concept-constants';

@Component({
  selector: 'app-requester-data',
  templateUrl: './requester-data.component.html'
})
export class RequesterDataComponent implements OnInit, OnChanges {

  @Input() formRequestData: FormGroup;
  @Input() validate: boolean;
  @Input() draft:any;

  public draftRequestData;

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

  ngOnChanges(changes:SimpleChanges) {
    if(changes.draft && this.draft) {
      this.draftRequestData = this.draft.request_data;
      if(!isEmptyObject(this.draftRequestData.typeSelectRequest)) {
        this.type = this.draftRequestData.typeSelectRequest;
        this.typeOutput.emit(this.type);
      }
    }
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
