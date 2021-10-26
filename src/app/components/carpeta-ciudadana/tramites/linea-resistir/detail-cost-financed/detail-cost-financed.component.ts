import {
    AfterViewChecked,
    ChangeDetectorRef,
    Component,
    Input,
    OnInit,
    SimpleChanges
    } from '@angular/core';
import { CatalogsService } from 'src/app/services/catalogs/catalogs.service';
import { ConceptConstants } from 'src/app/utils/constants/concept-constants';
import { Draft } from 'src/app/models/draft.model';
import { FormGroup } from '@angular/forms';
import { isEmptyObject } from 'jquery';
import { SelectFieldObject } from 'src/app/shared/form/fields/input-select/input-select';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { tipoProyecto } from 'src/app/utils/constants/app-constants';

@Component({
    selector: 'app-detail-cost-financed',
    templateUrl: 'detail-cost-financed.component.html'
})

export class DetailCostFinancedComponent implements OnInit {

    @Input() formLineaResistir: FormGroup;
    @Input() validate: boolean;
    @Input() draft:Draft;
    //se bebera de los catalogos
    private unsubscribe$ = new Subject<void>();

    showInversion = false;
    showCirculante = false;
    showInvCircu = false;
    public project_type: SelectFieldObject[];
    public pro: string = '';
   

    public draftDetailCostFinanced;

    constructor(
        private ref: ChangeDetectorRef,
        private catalogsService: CatalogsService
    ) { }

    ngOnChanges(changes:SimpleChanges) {
        if(changes.draft && !isEmptyObject(this.draft) && JSON.parse(this.draft.info).formLineaResistir) {
            this.draftDetailCostFinanced = JSON.parse(this.draft.info).formLineaResistir;
            if(!isEmptyObject(this.draftDetailCostFinanced.project_type)) {
                this.capturarCampo(this.draftDetailCostFinanced.project_type, 'project_type');
            }
        }
        this.ref.detectChanges();

    }

    ngOnInit() { 
        this.getApplicantTypes();
    }

    getApplicantTypes() {
        this.catalogsService.getCatalogByCode(ConceptConstants.DETAIL_TYPE_PROJECT).pipe(
          takeUntil(this.unsubscribe$)
        ).subscribe(
          data => this.project_type = data
        )
      }
    capturarCampo(ev, campo) {
        this[campo] = ev;
        console.log(this.pro);
        if (campo == 'pro') {
            switch (this.pro) {
                case 'linea-resistir-project-type-G1-investment':
                    this.showInversion = true;
                    this.showCirculante = false;
                    break;
                case 'linea-resistir-project-type-G2-circulating':
                    this.showInversion = false;
                    this.showCirculante = true;
                    break;
                case 'linea-resistir-project-type-G3-investment-and-circulating':
                    this.showInversion = true;
                    this.showCirculante = true;
                    break;
                default:
                    break;
            }
            this.ref.detectChanges();
        }
    }
    ngOnDestroy(): void {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
      }

}