import { Component, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { isEmptyObject } from 'jquery';
import { Draft } from 'src/app/models/draft.model';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CatalogsService } from 'src/app/services/catalogs/catalogs.service';
import { SelectFieldObject } from 'src/app/shared/form/fields/input-select/input-select';
import { AppUtils } from 'src/app/utils/app-utils';
import { ConceptConstants } from 'src/app/utils/constants/concept-constants';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-social-address',
  templateUrl: './social-address.component.html'
})
export class SocialAddressComponent implements OnInit {

  @Input() formSocialAdress: FormGroup;
  @Input() validate: boolean;
  @Input() isRequired: boolean;
  @Input() draft:any;
  @Input() readOnly: boolean;
  @Output() adreSocial: EventEmitter<FormGroup> = new EventEmitter<FormGroup>();
  public provincias: SelectFieldObject[];
  public municipios: SelectFieldObject[];
  public paises: SelectFieldObject[];
  public typeStreet: SelectFieldObject[];
  public province: string;

  public countriesSpain = ConceptConstants.COUNTRIES_SPAIN;

  public countrySpainSelected;
  public countrySelected;
  public draftSocialAddressData;
  private unsubscribe$ = new Subject<void>();

  errorCharacterLeng: string = 'empty_error';
  sendDate: FormGroup;
  sendDates: boolean = false;
  sendDates_2: boolean = false;
  
  constructor(
    private catalogService:CatalogsService
  ) { }
  getInfo(event){
    if(event.target.value){
      this.sendDates = true;
      this.sendInfo(this.sendDates_2);
    }else{
      this.sendDates = false;
    }
  }
 
sendInfo(date2: boolean){
  if(date2){
    this.adreSocial.emit(this.formSocialAdress.value);
  }
}

  ngOnInit(): void {
    this.getRoadTypes();
    this.getCountries();
  }

  ngOnChanges(changes:SimpleChanges) {
    if(changes.draft && this.draft) {
      this.draftSocialAddressData = this.draft.sosial_address;
      if(!isEmptyObject(this.draftSocialAddressData.social_country)) {
        this.countrySelected = this.draftSocialAddressData.social_country;
        if(!isEmptyObject(this.draftSocialAddressData.social_province)) {
          this.countrySpainSelected = this.draftSocialAddressData.social_province;
          this.onChangeSpainCountry(this.countrySpainSelected);
        }
      }
    }
  }

  public getRoadTypes() {
    this.catalogService.getCatalogByCode(ConceptConstants.ROAD_TYPES).pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe(
      data => this.typeStreet = AppUtils.sortConceptsAlphabetically(data)
    )
  }

  public getCountries() {
    this.catalogService.getCatalogByCode(ConceptConstants.COUNTRIES).pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe(
      data => {
        this.paises = AppUtils.sortConceptsAlphabetically(data)
        this.getSpainCountries()
      }
    )
  }

  public getSpainCountries() {
    this.catalogService.getCatalogByCode(ConceptConstants.COUNTRIES_SPAIN).pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe(
      data => this.provincias = AppUtils.sortConceptsAlphabetically(data)
    )
  }

  public onChangeSpainCountry(event) {
    
    this.province = event;
    
    this.catalogService.getCatalogByCode(event).pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe(
      data => this.municipios = AppUtils.sortConceptsAlphabetically(data),
      () => this.municipios = []
    )
  }

  public onChangeCountry(event) {
    this.countrySelected = event;
  }
  getMunicipality(){
    if(this.province == 'countries-spain-provinces-3' || this.province == 'countries-spain-provinces-46' || this.province == 'countries-spain-provinces-12'){
      this.sendDates_2 = true;
      this.sendInfo(this.sendDates_2);
    }else {
      this.sendDates_2 = false;
    }
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
