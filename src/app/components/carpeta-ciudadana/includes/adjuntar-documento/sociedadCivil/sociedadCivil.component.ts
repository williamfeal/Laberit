import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { isEmptyObject } from 'jquery';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { FileModel } from 'src/app/models/file.model';
import { CatalogsService } from 'src/app/services/catalogs/catalogs.service';
import { DocumentsType } from 'src/app/shared/form/fields/input-document/input-document';
import { ConceptConstants } from 'src/app/utils/constants/concept-constants';
import { deleteDocument, saveDocument } from '../AppUtils.component';

@Component({
    selector: 'app-sociedad-civil',
    templateUrl: './sociedadCivil.component.html'
})
export class SociedadCivilComponent implements OnInit {
    @Input() validate: boolean;
    @Input() fileListSo: FileModel[] = [];
    @Input() draft:any;

    public society_constitution_civil: boolean = true;
    public declarations_rent_civil: boolean = true;
    public model_390_civil: boolean = true;
    public model_184_entities_civil: boolean = true;
    public voucher_pay_civil: boolean = true;
    public model_130_131_civil: boolean = true;
    public model_347_civil: boolean = true;
    public registered_office_civil: boolean = true;
    public documentNif: boolean = true;
    public documentHelp: boolean = true;
    public responsible_declaration: boolean = true;
    public model_303: boolean = true;
    public distribution_by_year: boolean = true;
    public documentsTypeCivilSociety: DocumentsType;
    public draftCivilSociety;

    private unsubscribe$ = new Subject<void>();

    @Input() formAdjSociedad: FormGroup;

    constructor(public catalogService: CatalogsService) { }

    ngOnInit(): void {
        this.genericsDocsType()
    }

    ngOnChanges(changes:SimpleChanges) {
        if(changes.draft && !isEmptyObject(this.draft) && !isEmptyObject(this.draft.sociedad_civil)) {
            this.draftCivilSociety = this.draft.sociedad_civil
        }
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
