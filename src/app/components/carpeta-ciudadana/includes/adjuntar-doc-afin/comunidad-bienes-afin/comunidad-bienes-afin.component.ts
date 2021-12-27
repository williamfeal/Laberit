import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { isEmptyObject } from 'jquery';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { FileModel } from 'src/app/models/file.model';
import { CatalogsAfinService } from 'src/app/services/catalogs/catalogAfin.service';
import { DocumentsType } from 'src/app/shared/form/fields/input-document/input-document';
import { ConceptConstants } from 'src/app/utils/constants/concept-constants';
import { deleteDocument, saveDocument } from '../../adjuntar-documento/AppUtils.component';

@Component({
    selector: 'app-comunidad-bienes-afin',
    templateUrl: './comunidad-bienes-afin.component.html',
})
export class ComunidadBienesAfinComponent implements OnInit {
    @Input() fileListCo: FileModel[] = [];
    @Input() validate: boolean;
    @Input() draft:any;
    @Input() formAdjComuni: FormGroup;

    private unsubscribe$ = new Subject<void>();
    public draftComBienes;

    public mandatoryDocs: DocumentsType[];
    public optionalDocs: DocumentsType[];
    constructor(public catalogService: CatalogsAfinService) { }

    ngOnInit(): void {
        this.getMandatoryDocs();
        this.getOptionalDocs();
     }
    ngOnChanges(changes:SimpleChanges) {
        if(changes.draft && !isEmptyObject(this.draft) && !isEmptyObject(this.draft.cominidad_bienes)) {
            this.draftComBienes = this.draft
        }
    }

    private getMandatoryDocs() {
        this.catalogService.getCatalogByCodeAtConcept(ConceptConstants.MANDATORY_DOCS_AFIN, ConceptConstants.DOCS_AFIN_COMUNITY).pipe(
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
        this.catalogService.getCatalogByCodeAtConcept(ConceptConstants.OPTIONAL_DOCS_AFIN, ConceptConstants.DOCS_AFIN_COMUNITY).pipe(
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

    async getTemplates(concept: any){
        console.log(concept.concept_code); 
        this.catalogService.getCatalogByCodeAtConcept(ConceptConstants.TEMPLATES_DOCS_AFIN, concept.concept_code).subscribe((data)=>{
            concept.descriptionPlantilla = data[0].description; 
            console.log(data);   
        },  err => {
            concept.descriptionPlantilla = ''
        })
    }
    saveDocument(ev) {
        this[ev.controlName] = false;
        saveDocument(this.fileListCo, ev);
    }
    deleteDocument(ev) {
        this[ev.controlName] = true;
        deleteDocument(this.fileListCo, ev);
    }
    ngOnDestroy(): void {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }
}
