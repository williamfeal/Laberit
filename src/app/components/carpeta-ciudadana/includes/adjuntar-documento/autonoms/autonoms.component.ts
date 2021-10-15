import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { isEmptyObject } from 'jquery';
import { Observable, Subject } from 'rxjs';
import { catchError, isEmpty, takeUntil } from 'rxjs/operators';
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
    public validCodes: boolean[] = [];
    public documentsTypeAutonoms: DocumentsType;
    public codes: string[] = [];

    private unsubscribe$ = new Subject<void>();
    constructor(public catalogService: CatalogsService) { }

    ngOnInit(): void {
        this.genericsDocsType();
        
    }

    getTemplates(concept: string){
        let datas;
        this.catalogService.getCatalogByCode(concept).subscribe((data)=>{
            console.log();
        })
    }
    genericsDocsType() {
        this.catalogService.getCatalogByCode(ConceptConstants.LINEA_RESISTIR_AUTONOMS_DOCUMENTS).pipe(
            takeUntil(this.unsubscribe$)
        ).subscribe(
            data => {
                
                this.documentsTypeAutonoms = data;
                console.log(this.documentsTypeAutonoms)
                data.forEach(element => {
                
                    this.getTemplates(element.concept_code);

                });
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
  
}
