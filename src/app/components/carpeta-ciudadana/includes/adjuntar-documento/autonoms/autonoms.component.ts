import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
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
export class AutonomsComponent implements OnInit {
    @Input() formAdjuntarDocAuto: FormGroup;
    @Input() fileListAu: FileModel[] = [];
    @Input() validate: boolean;
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
        console.log(this.validate);
       
    }
    ngAfterViewChecked() {
        this.genericsDocsType()
    }
    genericsDocsType() {
        this.catalogService.getCatalogByCode(ConceptConstants.LINEA_RESISTIR_AUTONOMS_DOCUMENTS).pipe(
            takeUntil(this.unsubscribe$)
        ).subscribe(
            data => {
                this.documentsTypeAutonoms = data;
            }
        )
    }
    saveDocument(ev) {
        this[ev.controlName] = false;
        // this.codes.find((value, index) => {
        //     if (value === ev.controlName) {
        //         this.validCodes[index] = false;
        //     }
        // })
        console.log(this.validCodes);
        console.log(this.codes);
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
}
