import { CatalogsService } from 'src/app/services/catalogs/catalogs.service';
import { catchError, isEmpty, takeUntil } from 'rxjs/operators';
import {
    Component,
    Input,
    OnChanges,
    OnInit,
    SimpleChanges
    } from '@angular/core';
import { ConceptConstants } from 'src/app/utils/constants/concept-constants';
import { deleteDocument, saveDocument } from '../AppUtils.component';
import { DocumentsType } from 'src/app/shared/form/fields/input-document/input-document';
import { FileModel } from 'src/app/models/file.model';
import { FormGroup } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { isEmptyObject } from 'jquery';
import { Observable, Subject } from 'rxjs';

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
    @Input() readOnly: boolean;
    public urlPlantilla: string = '';
    public draftAutonomus;
    public validCodes: boolean[] = [];
    public documentsTypeAutonoms: DocumentsType;
    public collapse:boolean = true;
    public collapse2:boolean = false;

    public mandatoryDocs: DocumentsType[];
    public optionalDocs: DocumentsType[];

    public codes: string[] = [];
    public arrayUrls: string[] = [];
    private unsubscribe$ = new Subject<void>();
    constructor(public catalogService: CatalogsService) { }

    ngOnInit(): void {
        this.getMandatoryDocs();
        this.getOptionalDocs();
    }
 
   async getTemplates(concept: any){
        this.catalogService.getCatalogByCodePlantilla(concept.concept_code).subscribe((data)=>{
            concept.descriptionPlantilla = data[0].description;    
        },  err =>{
            400
        })
    }

    private getMandatoryDocs() {
        this.catalogService.getCatalogByCode(ConceptConstants.LINEA_RESISTIR_AUTONOMOUS_MANDATORY_DOCUMENTS).pipe(
            takeUntil(this.unsubscribe$)
        ).subscribe(
            data => {  
                data.forEach(element => {
                    this.getTemplates(element);    
                });
                this.mandatoryDocs = data; 
            }
        )
    }

    private getOptionalDocs() {
        this.catalogService.getCatalogByCode(ConceptConstants.LINEA_RESISTIR_AUTONOMOUS_OPTIONAL_DOCUMENTS).pipe(
            takeUntil(this.unsubscribe$)
        ).subscribe(
            data => {  
                data.forEach(element => {
                    this.getTemplates(element);    
                });
                this.optionalDocs = data; 
            }
        )
    }
    
    ngOnChanges(changes:SimpleChanges) {
        if(changes.draft && !isEmptyObject(this.draft) && !isEmptyObject(this.draft.autonomous)) {
            this.draftAutonomus = this.draft
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
