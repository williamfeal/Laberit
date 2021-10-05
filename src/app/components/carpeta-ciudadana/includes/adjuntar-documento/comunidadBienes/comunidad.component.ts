import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
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

    @Input() formAdjComuni: FormGroup;
    constructor(public catalogService: CatalogsService) { }
    
    ngOnInit(): void {
        this.genericsDocsType();
    }

    genericsDocsType() {
        this.catalogService.getCatalogByCode(ConceptConstants.LINEA_RESISTIR_GOODS_COMMUNIITY_DOCUMENTS).subscribe(
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
}
