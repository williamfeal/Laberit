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
    selector: 'app-sociedad-civil',
    templateUrl: './sociedadCivil.component.html'
})
export class SociedadCivilComponent implements OnInit {
    @Input() validate: boolean;
    @Input() fileListSo: FileModel[] = [];
    @Input() draft:any;

    public documentsTypeCivilSociety: DocumentsType;
    public draftCivilSociety;

    private unsubscribe$ = new Subject<void>();

    public mandatoryDocs: DocumentsType[];
    public optionalDocs: DocumentsType[];
    
    @Input() formAdjSociedad: FormGroup;

    constructor(public catalogService: CatalogsService) { }

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
        this.catalogService.getCatalogByCode(ConceptConstants.LINEA_RESISTIR_CIVIL_SOCIETY_OPTIONAL_DOCUMENTS).pipe(
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
        this.catalogService.getCatalogByCode(ConceptConstants.LINEA_RESISTIR_CIVIL_SOCIETY_MANDATORY_DOCUMENTS).pipe(
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
        this.catalogService.getCatalogByCode(concept.concept_code).subscribe((data)=>{
            concept.descriptionPlantilla = data[0].description;    
        })
    }

    genericsDocsType() {
        this.catalogService.getCatalogByCode(ConceptConstants.LINEA_RESISTIR_CIVIL_SOCIETY).pipe(
            takeUntil(this.unsubscribe$)
        ).subscribe(
            data => {
                data.forEach(element => {
                    this.getTemplates(element);    
                });
                this.documentsTypeCivilSociety = data; 
            }
        )
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
