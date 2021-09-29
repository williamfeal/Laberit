import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { FileModel } from 'src/app/models/file.model';
import { CatalogsService } from 'src/app/services/catalogs/catalogs.service';
import { DocumentsType } from 'src/app/shared/form/fields/input-document/input-document';
import { ConceptConstants } from 'src/app/utils/constants/concept-constants';
import { deleteDocument, saveDocument } from '../AppUtils.component';

@Component({
    selector: 'app-autonoms',
    templateUrl: './autonoms.component.html'
})
export class AutonomsComponent implements OnInit {
    @Input() fileListAu: FileModel[] = [];
    @Input() validate: boolean;
    public tax_returns: boolean = true;
    public self_assessment: boolean = true;
    public model_RLC: boolean = true;
    public model_347_: boolean = true;
    public model_390: boolean = true;
    public documentsTypeAutonoms: DocumentsType;

    constructor(public catalogService: CatalogsService) { }

    ngOnInit(): void {
        console.log(this.validate);
        this.genericsDocsType()
    }
    genericsDocsType(){
        this.catalogService.getCatalogByCode(ConceptConstants.LINEA_RESISTIR_AUTONOMS_DOCUMENTS).subscribe(
          data => this.documentsTypeAutonoms = data 
          
        )
    }
    saveDocument(ev) {
        saveDocument(this.fileListAu, ev);
        this[ev.controlName] = false;
        console.log(this.fileListAu);
    }
    deleteDocument(ev) {
        this[ev.controlName] = true;
        deleteDocument(this.fileListAu, ev);

    }
}
