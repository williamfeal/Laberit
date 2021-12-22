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
import { FormGroup } from '@angular/forms';
import { InfoSocialAddress } from './infoEnvio-model';
import { isEmptyObject } from 'jquery';
import { LanguagesService } from './../../../../services/moges-services/language.service';
import { SelectFieldObject } from 'src/app/shared/form/fields/input-select/input-select';
import { startWith, switchMap, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';


@Component({
  selector: 'app-productive-establishment-address',
  templateUrl: './productive-establishment-address.component.html'
})
export class ProductiveEstablishmentAddressComponent implements OnInit, OnChanges {
  @Input() formProductiveEstablishment: FormGroup;
  @Input() readOnly: boolean;
  @Input() validate: boolean = false;
  @Input() isRequired: boolean;
  @Input() draft:any;

  @Input() subject: Subject<FormGroup>;
  public infos?: InfoSocialAddress = {};

  public provincias: SelectFieldObject[];
  public municipios: SelectFieldObject[];
  public paises: SelectFieldObject[];
  public typeStreet:SelectFieldObject[];

  public draftProductiveEstablishmentData;
  public countrySelected;
  public countriesSpain = ConceptConstants.COUNTRIES_SPAIN;

  public errorCharacterLeng: string = 'empty_error';

  private unsubscribe$ = new Subject<void>();
  public prov: string;
  public muni: string;


  constructor(
    private catalogsService:CatalogsService,
    private languageService:LanguagesService
  ) {
    
   }

  ngOnInit(): void {
    this.loadData();
    this.languageService.lang.subscribe(
      () => this.loadData()
    )
    this.subject.pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe((text: any) => { 
      console.log(text)
      this.onChangeSpainCountry(text.social_province);
      this.onChangeMunicipy(text.social_municipality);
      this.infos = text;
      if(this.infos){
        this.countrySelected = this.countriesSpain;   
        this.formProductiveEstablishment.controls['productive_establishment_via_type'].setValue(this.infos.via_type);
        this.formProductiveEstablishment.controls['productive_establishment_country'].setValue(this.infos.social_country);
      } 
    });
   
}
  

  private loadData() {
    this.getRoadTypes();
    this.getCountries();
    this.getSpainCountries();
  }

  ngOnChanges(changes:SimpleChanges) {
    if(changes.draft && this.draft) {
      this.draftProductiveEstablishmentData = this.draft.productive_establishment;
      if(!isEmptyObject(this.draftProductiveEstablishmentData.productive_establishment_country)) {
        this.countrySelected = this.draftProductiveEstablishmentData.productive_establishment_country;
        if(!isEmptyObject(this.draftProductiveEstablishmentData.productive_establishment_province)) {
          this.onChangeSpainCountry(this.draftProductiveEstablishmentData.productive_establishment_province);
        }
      }
    }
  }
  
  public getRoadTypes() {
    this.catalogsService.getCatalogByCode(ConceptConstants.ROAD_TYPES).pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe(
      data => this.typeStreet = AppUtils.sortConceptsAlphabetically(data)
    )
  }

  public getCountries() {
    this.catalogsService.getCatalogByCode(ConceptConstants.COUNTRIES).pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe(
      data => this.paises = AppUtils.sortConceptsAlphabetically(data)
    )
  }

  public getSpainCountries() {
    this.catalogsService.getCatalogByCode(ConceptConstants.COUNTRIES_SPAIN).pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe(
      data => this.provincias = AppUtils.sortConceptsAlphabetically(data)
    )
  }

  public onChangeSpainCountry(event) {
    this.formProductiveEstablishment.controls['productive_establishment_province'].setValue(event);
    this.catalogsService.getCatalogByCode(event).pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe(
      data => this.municipios = AppUtils.sortConceptsAlphabetically(data)
    )
  }

  public onChangeMunicipy(event) {
    this.formProductiveEstablishment.controls['productive_establishment_municipality'].setValue(event);

  }

  public onChangeCountry(event) {
    this.countrySelected = event;
  }
  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
