import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { isEmptyObject } from 'jquery';
import { Subject } from 'rxjs';
import { isEmpty, takeUntil } from 'rxjs/operators';
import { FileModel } from 'src/app/models/file.model';
import { CatalogsService } from 'src/app/services/catalogs/catalogs.service';
import { DocumentsType } from 'src/app/shared/form/fields/input-document/input-document';
import { ConceptConstants } from 'src/app/utils/constants/concept-constants';
import { deleteDocument, saveDocument } from '../AppUtils.component';

@Component({
    selector: 'app-autonoms',
    templateUrl: './autonoms.component.html',
    styleUrls: ['./autonoms.component.scss']
})
export class AutonomsComponent implements OnInit, OnChanges {
    @Input() formAdjuntarDocAuto: FormGroup;
    @Input() fileListAu: FileModel[] = [];
    @Input() validate: boolean;
    @Input() draft:any;

    public draftAutonomus;
    public documentNif: boolean = true;
    public documentHelp: boolean = true;
    public responsible_declaration: boolean = true;
    public distribution_by_year: boolean = true;
    public model_303: boolean = true;
    public tax_returns: boolean = true;
    public self_assessment: boolean = true;
    public model_RLC: boolean = true;
    public model_347_: boolean = true;
    public model_390: boolean = true;
    public validCodes: boolean[] = [];
    public documentsTypeAutonoms: DocumentsType;
    public codes: string[] = [];

    private unsubscribe$ = new Subject<void>();
    constructor(public catalogService: CatalogsService) { }

    ngOnInit(): void {
        this.genericsDocsType();
    }

    genericsDocsType() {
        this.catalogService.getCatalogByCode(ConceptConstants.LINEA_RESISTIR_AUTONOMS_DOCUMENTS).pipe(
            takeUntil(this.unsubscribe$)
        ).subscribe(
            data => {
                console.log(data)
                this.documentsTypeAutonoms = data;
            }
        )
    }
    
    ngOnChanges(changes:SimpleChanges  ) {
        if(changes.draft && !isEmptyObject(this.draft) && !isEmptyObject(this.draft.autonomous)) {
            this.draftAutonomus = this.draft.autonomous
            console.log(this.formAdjuntarDocAuto)
        }
    }

    saveDocument(ev) {
        this[ev.controlName] = false;
        saveDocument(this.fileListAu, ev);
    }

    deleteDocument(ev) {
        this[ev.controlName] = true;
        deleteDocument(this.fileListAu, ev);
    }
    ngOnDestroy(): void {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }
    public openPdf() {
       this.catalogService.pruebaGet().subscribe(data=>{console.log(data);})
    }
}
