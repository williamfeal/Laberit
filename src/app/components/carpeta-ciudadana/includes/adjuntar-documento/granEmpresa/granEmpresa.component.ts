import { CatalogsService } from 'src/app/services/catalogs/catalogs.service';
import {
    Component,
    Input,
    OnInit,
    SimpleChanges
    } from '@angular/core';
import { ConceptConstants } from 'src/app/utils/constants/concept-constants';
import { deleteDocument, saveDocument } from '../AppUtils.component';
import { DocumentsType } from 'src/app/shared/form/fields/input-document/input-document';
import { FileModel } from 'src/app/models/file.model';
import { FormGroup } from '@angular/forms';
import { isEmptyObject } from 'jquery';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
    selector: 'app-gran-empresa',
    templateUrl: './granEmpresa.component.html'
})
export class GranEmpresaComponent implements OnInit {
    @Input() validate: boolean;
    @Input() draft:any;

    public model_347: boolean = true;
    public PYME_big: boolean = true;
    public business_group_big = true;
    public registered_office_big = true;
    public model_390 = true;
    public tax_returns_big = true;
    public _commercial_code_big = true;
    public annual_accounts_big = true;
    public legal_representative_big = true;
    public beneficial_ownership_big = true;
    public society_constitution_big = true;
    public documentNif: boolean = true;
    public documentHelp: boolean = true;
    public responsible_declaration: boolean = true;
    public model_303: boolean = true;
    public distribution_by_year: boolean = true;
    @Input() fileListGr: FileModel[] = [];
    public documentsTypeBigBussines: DocumentsType;
    public draftGranEmpresa;

    private unsubscribe$ = new Subject<void>();

    @Input() formAdjGranEm: FormGroup;

    constructor(public catalogService: CatalogsService) { }

    ngOnInit(): void {
        this.genericsDocsType();
    }

    ngOnChanges(changes:SimpleChanges) {
        if(changes.draft && !isEmptyObject(this.draft) && !isEmptyObject(this.draft.gran_empresa)) {
            this.draftGranEmpresa = this.draft.gran_empresa;
        }
      }

    saveDocument(ev) {
        this[ev.controlName] = false;
        saveDocument(this.fileListGr, ev);
    }

    genericsDocsType() {
        this.catalogService.getCatalogByCode(ConceptConstants.LINEA_RESISTIR_BIG_BUSSINESS_DOCUMENTS).pipe(
            takeUntil(this.unsubscribe$)
        ).subscribe(
            data => this.documentsTypeBigBussines = data
        )
    }

    deleteDocument(ev) {
        this[ev.controlName] = true;
        deleteDocument(this.fileListGr, ev);
    }
    ngOnDestroy(): void {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }
}
