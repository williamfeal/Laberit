import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { isEmptyObject } from 'jquery';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Draft } from 'src/app/models/draft.model';
import { CatalogsService } from 'src/app/services/catalogs/catalogs.service';
import { SelectFieldObject } from 'src/app/shared/form/fields/input-select/input-select';
import { tipoInteres } from 'src/app/utils/constants/app-constants';
import { ConceptConstants } from 'src/app/utils/constants/concept-constants';

@Component({
    selector: 'app-procedure-information',
    templateUrl: 'procedure-information.component.html'
})

export class ProcedureInformationComponent implements OnInit, OnChanges {

    @Input() formLineaResistir: FormGroup;
    @Input() validate: boolean;
    @Input() draft:Draft;

    //se bebera de los catalogos
    public tipoInteres: SelectFieldObject[];
    private unsubscribe$ = new Subject<void>();
    public term: SelectFieldObject[];
    public lack: SelectFieldObject[];

    public draftProcedureInformation;
    constructor(
        public catalogsService: CatalogsService
    ) { }

    ngOnInit() { 
        this.getApplicantTypes();
        this.getApplicantPlazos();
        this.getApplicantLack();
    }
    getApplicantTypes() {
        this.catalogsService.getCatalogByCode(ConceptConstants.INTEST_TYPE_RATE).pipe(
          takeUntil(this.unsubscribe$)
        ).subscribe(
          data => this.tipoInteres = data
        )
    }

    getApplicantPlazos(){
      this.catalogsService.getCatalogByCode(ConceptConstants.LINEA_RESISTIR_PLAZOS).pipe(
        takeUntil(this.unsubscribe$)
      ).subscribe(
        data => this.term = data
      )
    } 

    getApplicantLack(){
      this.catalogsService.getCatalogByCode(ConceptConstants.LINEA_RESISTIR_LACK).pipe(
        takeUntil(this.unsubscribe$)
      ).subscribe(
        data => this.lack = data
      )
    } 

    ngOnChanges(changes:SimpleChanges) {
        if(changes.draft && !isEmptyObject(this.draft) && JSON.parse(this.draft.info).formLineaResistir) {
            this.draftProcedureInformation = JSON.parse(this.draft.info).formLineaResistir;
        }
    }

    ngOnDestroy(): void {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
      }
}