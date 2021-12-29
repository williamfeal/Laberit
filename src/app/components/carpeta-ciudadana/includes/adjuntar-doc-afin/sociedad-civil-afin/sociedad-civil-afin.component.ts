import { CatalogsService } from 'src/app/services/catalogs/catalogs.service';
import {
    Component,
    Input,
    OnInit,
    SimpleChanges
    } from '@angular/core';
import { ConceptConstants } from 'src/app/utils/constants/concept-constants';
import { DocumentsType } from 'src/app/shared/form/fields/input-document/input-document';
import { FileModel } from 'src/app/models/file.model';
import { FormGroup } from '@angular/forms';
import { isEmptyObject } from 'jquery';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { deleteDocument, saveDocument } from '../../adjuntar-documento/AppUtils.component';
import { CatalogsAfinService } from 'src/app/services/catalogs/catalogAfin.service';

@Component({
    selector: 'app-sociedad-civil-afin',
    templateUrl: './sociedad-civil-afin.component.html'
})
export class SociedadCivilAfinComponent implements OnInit {
    @Input() validate: boolean;
    @Input() fileListSo: FileModel[] = [];
    @Input() draft:any;

    public documentsTypeCivilSociety: DocumentsType;
    public draftCivilSociety;

    private unsubscribe$ = new Subject<void>();

    public mandatoryDocs: DocumentsType[];
    public optionalDocs: DocumentsType[];
    
    @Input() formAdjSociedad: FormGroup;

    constructor(public catalogService: CatalogsAfinService) { }

    ngOnInit(): void {
        this.getMandatoryDocs();
        this.getOptionalDocs();
    }

    ngOnChanges(changes:SimpleChanges) {
        if(changes.draft && !isEmptyObject(this.draft)) {
            this.draftCivilSociety = this.draft;
        }
    }

    private getMandatoryDocs() {
        this.catalogService.getCatalogByCodeAtConcept(ConceptConstants.MANDATORY_DOCS_AFIN,ConceptConstants.DOCS_AFIN_CIVIL_SOCIETY).pipe(
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
        this.catalogService.getCatalogByCodeAtConcept(ConceptConstants.OPTIONAL_DOCS_AFIN,ConceptConstants.DOCS_AFIN_CIVIL_SOCIETY).pipe(
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

    saveDocument(ev) {
        this[ev.controlName] = false;
        saveDocument(this.fileListSo, ev);
    }

    async getTemplates(concept: any){
        this.catalogService.getCatalogByCodeAtConcept(ConceptConstants.TEMPLATES_DOCS_AFIN,concept.concept_code).subscribe((data)=>{
            concept.descriptionPlantilla = data[0].description;    
        })
    }

    deleteDocument(ev) {
        this[ev.controlName] = true;
        deleteDocument(this.fileListSo, ev);
    }

    ngOnDestroy(): void {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }
}
