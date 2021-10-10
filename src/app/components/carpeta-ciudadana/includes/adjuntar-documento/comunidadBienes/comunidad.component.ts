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
    selector: 'app-comunidadBienes',
    templateUrl: './comunidad.component.html'
})
export class ComunidadBienesComponent implements OnInit {
    @Input() fileListCo: FileModel[] = [];
    @Input() validate: boolean;
    @Input() draft:any;

    public registered_office_community: boolean = true;
    public model_347_community: boolean = true;
    public model_130_131_community: boolean = true;
    public voucher_pay_community: boolean = true;
    public model_390_community: boolean = true;
    public model_184_entities_community: boolean = true;
    public declarations_rent_community: boolean = true;
    public society_constitution_community: boolean = true;
    public documentsTypeCommunity: DocumentsType;
    public documentNif: boolean = true;
    public documentHelp: boolean = true;
    public responsible_declaration: boolean = true;
    public model_303: boolean = true;
    public distribution_by_year: boolean = true;
    private unsubscribe$ = new Subject<void>();
    public draftComBienes;

    @Input() formAdjComuni: FormGroup;
    constructor(public catalogService: CatalogsService) { }
    
    ngOnInit(): void {
        this.genericsDocsType();
    }

    ngOnChanges(changes:SimpleChanges) {
        if(changes.draft && !isEmptyObject(this.draft) && !isEmptyObject(this.draft.cominidad_bienes)) {
            this.draftComBienes = this.draft.cominidad_bienes
            console.log(this.draftComBienes)
        }
    }

    genericsDocsType() {
        this.catalogService.getCatalogByCode(ConceptConstants.LINEA_RESISTIR_GOODS_COMMUNIITY_DOCUMENTS).pipe(
            takeUntil(this.unsubscribe$)
        ).subscribe(
            data => this.documentsTypeCommunity = data
            
        )
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
