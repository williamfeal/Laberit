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
import { FormGroup } from '@angular/forms';
import { isEmptyObject } from 'jquery';
import { SelectFieldObject } from 'src/app/shared/form/fields/input-select/input-select';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { tipoInteres } from 'src/app/utils/constants/app-constants';

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

    public draftProcedureInformation;
    constructor(
        public catalogsService: CatalogsService
    ) { }

    ngOnInit() { 
        this.getApplicantTypes();
    }
    getApplicantTypes() {
        this.catalogsService.getCatalogByCode(ConceptConstants.INTEST_TYPE_RATE).pipe(
          takeUntil(this.unsubscribe$)
        ).subscribe(
          data => this.tipoInteres = data
        )
      }
    ngOnChanges(changes:SimpleChanges) {
        if(changes.draft && !isEmptyObject(this.draft) && JSON.parse(this.draft.info)) {
            this.draftProcedureInformation = JSON.parse(this.draft.info);
        }
    }
    ngOnDestroy(): void {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
      }
}