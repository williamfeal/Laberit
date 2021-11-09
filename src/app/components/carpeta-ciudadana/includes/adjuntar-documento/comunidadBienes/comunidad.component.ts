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
    selector: 'app-comunidadBienes',
    templateUrl: './comunidad.component.html'
})
export class ComunidadBienesComponent implements OnInit {
    @Input() fileListCo: FileModel[] = [];
    @Input() validate: boolean;
    @Input() draft:any;


    private unsubscribe$ = new Subject<void>();
    public draftComBienes;

    public mandatoryDocs: DocumentsType[];
    public optionalDocs: DocumentsType[];

    @Input() formAdjComuni: FormGroup;
    constructor(public catalogService: CatalogsService) { }
    
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
        this.catalogService.getCatalogByCode(ConceptConstants.LINEA_RESISTIR_GOODS_COMMUNITY_MANDATORY_DOCUMENTS).pipe(
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
        this.catalogService.getCatalogByCode(ConceptConstants.LINEA_RESISTIR_GOODS_COMMUNITY_OPTIONAL_DOCUMENTS).pipe(
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
        this.catalogService.getCatalogByCode(concept.concept_code).subscribe((data)=>{
            concept.descriptionPlantilla = data[0].description;    
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
