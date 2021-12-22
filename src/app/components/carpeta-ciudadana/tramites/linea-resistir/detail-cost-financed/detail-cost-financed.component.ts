import {
  AfterViewChecked,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
  SimpleChanges
  } from '@angular/core';
import { AppUtils } from 'src/app/utils/app-utils';
import { CatalogsService } from 'src/app/services/catalogs/catalogs.service';
import { ConceptConstants } from 'src/app/utils/constants/concept-constants';
import { Draft } from 'src/app/models/draft.model';
import { FormGroup } from '@angular/forms';
import { isEmptyObject } from 'jquery';
import { SelectFieldObject } from 'src/app/shared/form/fields/input-select/input-select';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { ActiveIVF } from './dialog-activeIVF/activeIVF.component';

@Component({
    selector: 'app-detail-cost-financed',
    templateUrl: 'detail-cost-financed.component.html',
    styleUrls: ['detail-cost-financed.component.css']
})

export class DetailCostFinancedComponent implements OnInit {

    @Input() formLineaResistir: FormGroup;
    @Input() validate: boolean;
    @Input() draft:Draft;
    @Input() readOnly: boolean;
    public provincias: SelectFieldObject[];
    public municipios: SelectFieldObject[];
    public paises: SelectFieldObject[];
    public province: string;
    //se bebera de los catalogos
    private unsubscribe$ = new Subject<void>();
    public countrySpainSelected;
    public countrySelected;
    public countriesSpain = ConceptConstants.COUNTRIES_SPAIN;

    public showInversion = false;
    public showCirculante = false;
    public showInvCircu = false;

    public project_type: SelectFieldObject[];
    public pro: string = '';

    public errorCharacterLeng: string = 'empty_error';

    public draftDetailCostFinanced;
    public totalInvestmentAssets: number;
    public totalPlannedFinancing: number;
    public sowInputsTotalActivos: boolean;

    public showInformationPopUp: boolean;

    constructor(
        private ref: ChangeDetectorRef,
        private catalogsService: CatalogsService,
        private dialog: MatDialog,
    ) { }

    ngOnChanges(changes:SimpleChanges) { 
        if(changes.draft && !isEmptyObject(this.draft) && JSON.parse(this.draft.info)) {
            this.draftDetailCostFinanced = JSON.parse(this.draft.info);
            if(!isEmptyObject(this.draftDetailCostFinanced.project_type)) {
                this.pro = this.draftDetailCostFinanced.project_type;
                this.capturarCampo(this.draftDetailCostFinanced.project_type, 'pro');
            }
            if(!isEmptyObject(this.draftDetailCostFinanced.social_country)) {
              this.countrySelected = this.draftDetailCostFinanced.social_country;
              if(!isEmptyObject(this.draftDetailCostFinanced.social_province)) {
                this.countrySpainSelected = this.draftDetailCostFinanced.social_province;
                this.onChangeSpainCountry(this.countrySpainSelected);
              }
            }
        }
        this.ref.detectChanges();

    }

    ngOnInit() { 
        this.getApplicantTypes();
        this.getCountries();

        if(sessionStorage.getItem('idProcedure') == ConceptConstants.LINEA_AFIN_INVIERTE_MICRO){
          this.sowInputsTotalActivos = true;
        }else{
          this.sowInputsTotalActivos = false;
        }
    }

    private getApplicantTypes() {
        this.catalogsService.getCatalogByCode(ConceptConstants.DETAIL_TYPE_PROJECT).pipe(
          takeUntil(this.unsubscribe$)
        ).subscribe(
          data => this.project_type = data
        )
    }

    public capturarCampo(ev, campo) {
        this[campo] = ev;
        if (campo == 'pro') {
            switch (this.pro) {
                case 'linea-resistir-project-type-G1-investment':
                    this.showInformationPopUp = true;
                    this.showInversion = true;
                    this.showCirculante = false;
                    break;
                case 'linea-resistir-project-type-G2-circulating':
                    this.showInversion = false;
                    this.showCirculante = true;
                    this.showInformationPopUp = false;
                    break;
                case 'linea-resistir-project-type-G3-investment-and-circulating':
                    this.showInversion = true;
                    this.showCirculante = true;
                    this.showInformationPopUp = false;
                    break;
                default:
                    break;
            }
            this.ref.detectChanges();
        }
    }
    
    public onChangeCountry(event) {
        this.countrySelected = event;
        this.getSpainCountries();
    }

    public getCountries() {
      this.catalogsService.getCatalogByCode(ConceptConstants.COUNTRIES).pipe(
        takeUntil(this.unsubscribe$)
      ).subscribe(
        data => {
          this.paises = AppUtils.sortConceptsAlphabetically(data)
          this.getSpainCountries()
        }
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
      this.province = event;
      this.catalogsService.getCatalogByCode(event).pipe(
        takeUntil(this.unsubscribe$)
      ).subscribe(
        data => this.municipios = AppUtils.sortConceptsAlphabetically(data),
        () => this.municipios = []
      )
    }
  
    openDialog(): void {
      let dialogRef = this.dialog.open(ActiveIVF, {
        width: '450px',
      });
    }

    onChangeTotalInvestmentAssets(event){
      let ground = this.formLineaResistir.controls.g1terrenos.value == undefined ? 0 : this.formLineaResistir.controls.g1terrenos.value;
      let properties = this.formLineaResistir.controls.g1inmuebles.value == undefined ? 0 : this.formLineaResistir.controls.g1inmuebles.value;
      let machinery = this.formLineaResistir.controls.g1maquinaria.value == undefined ? 0 : this.formLineaResistir.controls.g1maquinaria.value;
      let installation = this.formLineaResistir.controls.g1instalaciones.value == undefined ? 0 : this.formLineaResistir.controls.g1instalaciones.value;
      let others = this.formLineaResistir.controls.g1otros.value == undefined ? 0 : this.formLineaResistir.controls.g1otros.value;
      this.totalInvestmentAssets = ground + properties + machinery + installation + others;
    }

    onChangeTotalFinanciacionPrevista(event){
      let own_resources = this.formLineaResistir.controls.recursosPropios.value == undefined ? 0 : this.formLineaResistir.controls.recursosPropios.value;
      let grants = this.formLineaResistir.controls.subvenciones.value == undefined ? 0 : this.formLineaResistir.controls.subvenciones.value;
      let other_bank_financing = this.formLineaResistir.controls.otraFinBancaria.value == undefined ? 0 : this.formLineaResistir.controls.otraFinBancaria.value;
      let active_ivf = this.formLineaResistir.controls.activoIVF.value == undefined ? 0 : this.formLineaResistir.controls.activoIVF.value;
      this.totalPlannedFinancing = own_resources + grants + other_bank_financing + active_ivf;
    }

    onChangeProperties

    ngOnDestroy(): void {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
      }

}