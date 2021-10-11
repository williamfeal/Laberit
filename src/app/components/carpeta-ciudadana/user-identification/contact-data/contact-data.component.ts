import { AppUtils } from 'src/app/utils/app-utils';
import { CatalogsService } from 'src/app/services/catalogs/catalogs.service';
import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges
  } from '@angular/core';
import { ConceptConstants } from 'src/app/utils/constants/concept-constants';
import { Draft } from 'src/app/models/draft.model';
import { EMAIL_REGEX } from 'src/app/utils/constants/app-constants';
import { FormGroup } from '@angular/forms';
import { isEmptyObject } from 'jquery';
import { SelectFieldObject } from 'src/app/shared/form/fields/input-select/input-select';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-contact-data',
  templateUrl: './contact-data.component.html',
  styleUrls: ['./contact-data.component.scss']
})
export class ContactDataComponent implements OnInit, OnChanges {

  @Input() formContactData: FormGroup;
  @Input() readOnly: boolean;
  @Input() interesado: boolean;
  @Input() validate: boolean;
  @Input() public emailErrorContact: boolean;
  @Input() draft:any;

  public errorCharacterLeng: string = 'empty_error';
  public errorNif: string = 'nif_error';
  public isChecked: boolean;
  public showInputs: boolean = true;

  public provincias: SelectFieldObject[];
  public municipios: SelectFieldObject[];
  public paises: SelectFieldObject[];
  public typeStreet: SelectFieldObject[];
  public draftContactData;

  public countriesSpain = ConceptConstants.COUNTRIES_SPAIN;

  public countrySpainSelected;
  public countrySelected;

  private unsubscribe$ = new Subject<void>();

  constructor(
    private catalogService:CatalogsService
  ) { }

  ngOnInit(): void {
    this.getCountries();
    this.getSpainCountries();
    this.getRoadTypes();
  }

  ngOnChanges(changes:SimpleChanges) {
    if(changes.draft && this.draft) {
      this.draftContactData = this.draft.contact_data;
      if(!isEmptyObject(this.draftContactData.contact_data_country)) {
        this.countrySelected = this.draftContactData.contact_data_country;
        if(!isEmptyObject(this.draftContactData.contact_data_province)) {
          this.countrySpainSelected = this.draftContactData.contact_data_province;
          this.onChangeSpainCountry(this.countrySpainSelected);
        }
      }
    }
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
    console.log(this.isChecked)
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
