import {
  AfterContentChecked,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges
  } from '@angular/core';
import { AppUtils } from 'src/app/utils/app-utils';
import { CatalogsService } from 'src/app/services/catalogs/catalogs.service';
import { ConceptConstants } from 'src/app/utils/constants/concept-constants';
import { Draft } from 'src/app/models/draft.model';
import { EMAIL_REGEX } from 'src/app/utils/constants/app-constants';
import { FormGroup } from '@angular/forms';
import { isEmptyObject } from 'jquery';
import { LanguagesService } from './../../../../services/moges-services/language.service';
import { SelectFieldObject } from 'src/app/shared/form/fields/input-select/input-select';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-contact-data',
  templateUrl: './contact-data.component.html',
  styleUrls: ['./contact-data.component.scss']
})
export class ContactDataComponent implements OnInit, OnChanges, AfterContentChecked {

  @Input() formContactData: FormGroup;
  @Input() readOnly: boolean;
  @Input() interesado: boolean;
  @Input() validate: boolean;
  @Input() public emailErrorContact: boolean;
  @Input() draft:any;
  @Input() position: boolean;

  public errorCharacterLeng: string = 'empty_error';
  public errorNif: string = 'nif_error';
  @Input() isChecked: boolean;
  public showInputs: boolean = true;

  public provincias: SelectFieldObject[];
  public municipios: SelectFieldObject[];
  public paises: SelectFieldObject[];
  public typeStreet: SelectFieldObject[];
  public draftContactData;

  public countriesSpain = ConceptConstants.COUNTRIES_SPAIN;

  public countrySpainSelected;
  public countrySelected;
  public position_contact;
  private unsubscribe$ = new Subject<void>();

  constructor(
    private catalogService:CatalogsService,
    private languageService:LanguagesService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.loadData();
    this.languageService.lang.subscribe(
      () => this.loadData()
    )
  }

  private loadData() {
    this.getCountries();
    this.getSpainCountries();
    this.getRoadTypes();
  }

  ngOnChanges(changes:SimpleChanges) {
    if(changes.draft && this.draft) {
      this.draftContactData = this.draft.contact_data;
      if(Object.keys(this.draftContactData).every(
        field => isEmptyObject(this.draftContactData[field]))) this.isChecked = true;
      if(!isEmptyObject(this.draftContactData.contact_data_country)) {
        this.countrySelected = this.draftContactData.contact_data_country;
        if(!isEmptyObject(this.draftContactData.contact_data_province)) {
          this.countrySpainSelected = this.draftContactData.contact_data_province;
          this.onChangeSpainCountry(this.countrySpainSelected);
        }
      }
    }
    //Validation: when the company type is Anonimus, the "cargo" field is removed
    this.position_contact = changes.position.currentValue;
  }

  ngAfterContentChecked() {
    this.cdr.detectChanges();
  }

  private getRoadTypes() {
    this.catalogService.getCatalogByCode(ConceptConstants.ROAD_TYPES).pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe(
      data => this.typeStreet = AppUtils.sortConceptsAlphabetically(data)
    )
  }

  private getCountries() {
    this.catalogService.getCatalogByCode(ConceptConstants.COUNTRIES).pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe(
      data => this.paises = AppUtils.sortConceptsAlphabetically(data)
    )
  }

  private getSpainCountries() {
    this.catalogService.getCatalogByCode(ConceptConstants.COUNTRIES_SPAIN).pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe(
      data => this.provincias = AppUtils.sortConceptsAlphabetically(data)
    )
  }

  public onChangeSpainCountry(event) {
    this.catalogService.getCatalogByCode(event).pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe(
      data => this.municipios = AppUtils.sortConceptsAlphabetically(data)
    )
  }

  public onChangeCountry(event) {
    this.countrySelected = event;
  }

  public checkValue() {
  }
  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
  capturarCorreo(ev) {
    if (ev.match(EMAIL_REGEX) == null) {
      this.emailErrorContact = true;
    } else {
      this.emailErrorContact = false;
    }
  }
  
}
