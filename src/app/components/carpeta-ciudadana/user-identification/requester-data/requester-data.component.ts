import { CatalogsService } from 'src/app/services/catalogs/catalogs.service';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChange,
  SimpleChanges
  } from '@angular/core';
import { ConceptConstants } from 'src/app/utils/constants/concept-constants';
import { Draft } from 'src/app/models/draft.model';
import { FormGroup } from '@angular/forms';
import { isEmptyObject } from 'jquery';
import { LanguagesService } from 'src/app/services/moges-services/language.service';
import { SelectFieldObject } from 'src/app/shared/form/fields/input-select/input-select';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-requester-data',
  templateUrl: './requester-data.component.html'
})
export class RequesterDataComponent implements OnInit, OnChanges {

  @Input() formRequestData: FormGroup;
  @Input() validate: boolean;
  @Input() draft:any;
  @Input() readOnly: boolean;

  public draftRequestData;

  errorCharacterLeng: string = 'empty_error';

  public type = 'interested'; 
  public actuation: SelectFieldObject[];
  public representation_power:SelectFieldObject[];

  @Output() public typeOutput = new EventEmitter<string>();

  private unsubscribe$ = new Subject<void>();

  constructor(
    private catalogsService:CatalogsService,
    private languageService:LanguagesService
  ) { }

  ngOnInit(): void {
    this.languageService.lang.subscribe(
      () => {
        this.getApplicantTypes();
        this.getRepresentativeTypes();
      }
    )
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
    // se ajusta la funcion para que valide los tipos y
   // cambie los labels
   // autor: @William 4 Enero 2022 
    this.actuation = [];
    this.catalogsService.getCatalogByCode(ConceptConstants.APPLICANT_TYPES).pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe(
	    data =>{
        
		const act: any = data;
		console.log('--------', data)
		for (const item of act){
			let res: any = {};
			console.log(res)
			if(item.concept_code == 'ivf-applicant-types-interested'){
        if (item.description.include('Interesado')){
          res = {
            concept_code: item.concept_code,
            description: 'Interesado'
          }
        }else{
          res = {
            concept_code: item.concept_code,
            description: 'Interesat'
          }
        }
				
			}else if(item.concept_code !== 'ivf-applicant-types-representantive'){
				res = {
						concept_code: item.concept_code,
						description: item.description
					}
			}else{
				res = {
						concept_code: '',
						description: ''
					}
			}
			if (res.concept_code !== ''){
				this.actuation.push(res);
			}
		}
		console.log('************',this.actuation)
		}
    )
  }

  getRepresentativeTypes() {
    this.catalogsService.getCatalogByCode(ConceptConstants.REPRESENTATIVE_TYPES).pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe(
      data => this.representation_power = data
    )
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
