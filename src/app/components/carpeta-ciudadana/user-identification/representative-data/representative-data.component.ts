import { AppConstants } from 'src/app/utils/constants/app-constants';
import { AppUtils } from 'src/app/utils/app-utils';
import { BussinesType } from './dialog-bussinesType/bussinesType.component';
import { CarpetaService } from './../../../../services/acli-service/carpeta.service';
import { CatalogsService } from 'src/app/services/catalogs/catalogs.service';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges
  } from '@angular/core';
import { ConceptConstants } from 'src/app/utils/constants/concept-constants';
import { FormGroup } from '@angular/forms';
import { isEmptyObject } from 'jquery';
import { LanguagesService } from './../../../../services/moges-services/language.service';
import { MatDialog } from '@angular/material/dialog';
import { SelectFieldObject } from 'src/app/shared/form/fields/input-select/input-select';
import { Subject } from 'rxjs';
import { SwalUtils } from 'src/app/utils/swal-utils';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-representative-data',
  templateUrl: './representative-data.component.html',
  styleUrls: ['./representative-data.component.css']
})
export class RepresentativeDataComponent implements OnInit, OnChanges {

  @Input() formRepresentativeData: FormGroup;
  @Input() readOnly: boolean;
  @Input() validate: boolean;
  @Input() isRequired: boolean;
  @Input() negativos: boolean = true;
  @Input() draft:any;

  @Output() public businessTypeOutput = new EventEmitter<string>();
  @Output() public businessTypeData = new EventEmitter<string>();

  errorCharacterLeng: string = 'empty_error';
  errorNif: string = 'nif_error';

  public businessType: SelectFieldObject[];
  public representativeTypes: SelectFieldObject[];
  public belongingCompany:SelectFieldObject[];
  public countries:SelectFieldObject[];
  public genders:SelectFieldObject[];
  public cnaeOptions:SelectFieldObject[];
  public comunidadBienes: boolean = false;
  public communityOfGoods: boolean;
  public representativeTypeSelected;
  public businessTypeSelected;
  public draftRepresentativeData;

  
  private unsubscribe$ = new Subject<void>();

  constructor(
    private catalogService:CatalogsService,
    private languageService:LanguagesService,
    private dialog: MatDialog,
    private carpetaService:CarpetaService
  ) { }

  ngOnInit(): void {
    sessionStorage.getItem('company_type') === ConceptConstants.REPRESENTATIVE_COMMUNITY_OF_GOODS || 
    sessionStorage.getItem('company_type') === ConceptConstants.REPRESENTATIVE_COMMUNITY_OF_GOODS ? this.comunidadBienes = true : this.comunidadBienes = false;
    this.loadData();
    this.languageService.lang.subscribe(
      () => this.loadData()
    )
  }
  
  private loadData() {
    this.getRepresentativeType();
    this.getBelongingCompany();
    this.getCountries();
    this.getGenders();
    this.getCNAEoptions();
  }

  ngOnChanges(changes:SimpleChanges) {
    if(changes.draft && this.draft) {
      this.draftRepresentativeData = this.draft.representative_data;
      if(!isEmptyObject(this.draftRepresentativeData.representativeTypes)) {
        this.representativeTypeChange(this.draftRepresentativeData.representativeTypes);
      }
      if(!isEmptyObject(this.draftRepresentativeData.businessType)) {
        this.businessTypeOutput.emit(this.draftRepresentativeData.businessType);
        sessionStorage.setItem('company_type', this.draftRepresentativeData.businessType);
      }
    }
  }

  public showRepresentaBtn():boolean {
    return sessionStorage.getItem('nifTitular') !== this.formRepresentativeData.value.represented_data_nif;
  
  }

  public isJuridicPerson() {
    return this.representativeTypeSelected === ConceptConstants.REPRESENTATIVE_TYPES_JURIDIC_PERSON;
  }

  public representativeTypeChange(event: string) {
    this.businessType=[];
    this.representativeTypeSelected = event;
  
    this.catalogService.getCatalogByCode(this.representativeTypeSelected).pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe(
      (data:any) => {
        this.businessType = AppUtils.sortConceptsAlphabetically(data);
        this.businessTypeData.emit(this.representativeTypeSelected);
      });
  }

  private getCNAEoptions() {
    switch(sessionStorage.getItem('idProcedure')) {
      case AppConstants.LINEA_RESISTIR_CODE:
        this.catalogService.getCatalogByCode(ConceptConstants.CNAE_CODES_LINEA_RESISTIR).pipe(
          takeUntil(this.unsubscribe$)
        ).subscribe(
          data => this.cnaeOptions = AppUtils.sortConceptsAlphabetically(data)
        )
        break;
      default:
        this.catalogService.getCatalogByCode(ConceptConstants.CNAE_CODES).pipe(
          takeUntil(this.unsubscribe$)
        ).subscribe(
          data => this.cnaeOptions = AppUtils.sortConceptsAlphabetically(data)
        )
    }
  }

  private getRepresentativeType() {
    this.catalogService.getCatalogByCode(ConceptConstants.REPRESENTATIVE_TYPES).pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe(
      data => this.representativeTypes = AppUtils.sortConceptsAlphabetically(data)
    )
  }

  private getBelongingCompany() {
    this.catalogService.getCatalogByCode(ConceptConstants.GROUP_BELONGING_COMPANY).pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe(
      data => this.belongingCompany = data
    )
  }

  private getCountries() {
    this.catalogService.getCatalogByCode(ConceptConstants.COUNTRIES).pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe(
      data => this.countries = AppUtils.sortConceptsAlphabetically(data)
    )
  }
  
  private getGenders() {
    this.catalogService.getCatalogByCode(ConceptConstants.GENDERS).pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe(
      data => this.genders = data
    )
  }

  public businessTypeChange(event: string) {
    this.businessTypeOutput.emit(event);
    this.businessTypeSelected = event;
    sessionStorage.setItem('company_type', event);
    sessionStorage.getItem('company_type') === ConceptConstants.REPRESENTATIVE_COMMUNITY_OF_GOODS || 
      this.businessTypeSelected === ConceptConstants.REPRESENTATIVE_PHYSIC_AUTONOMOUS ?  
      this.comunidadBienes = true : this.comunidadBienes = false;
    
    //Validation to show the fields "active, represent_data_turnover" according to type of company
    this.communityOfGoods = event === ConceptConstants.REPRESENTATIVE_COMMUNITY_OF_GOODS ? true : false;
  }

  public isAutonum() {
    return this.businessTypeSelected === ConceptConstants.REPRESENTATIVE_PHYSIC_AUTONOMOUS
  }

  openDialog(): void {
    let dialogRef = this.dialog.open(BussinesType, {
      width: '1250px',
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
