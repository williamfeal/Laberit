import { Component, Input, OnInit } from '@angular/core';
import { FileModel } from 'src/app/models/file.model';
import { CatalogsService } from 'src/app/services/catalogs/catalogs.service';
import { DocumentsType } from 'src/app/shared/form/fields/input-document/input-document';
import { ConceptConstants } from 'src/app/utils/constants/concept-constants';
import { deleteDocument, saveDocument } from '../AppUtils.component';

@Component({
    selector: 'app-pyme',
    templateUrl: './PYME.component.html'
})
export class PymeComponent implements OnInit {
    @Input() fileListPy: FileModel[] = [];
    @Input() validate: boolean;
    public society_constitution_PYME: boolean = true;
    public beneficial_ownership_PYME: boolean = true;
    public legal_representative_PYME: boolean = true;
    public annual_accounts_PYME: boolean = true;
    public _commercial_code_PYME: boolean = true;
    public tax_returns_PYME: boolean = true;
    public risk_inform_PYME: boolean = true;
    public model_390_PYME: boolean = true;
    public model_347_PYME: boolean = true;
    public registered_office_PYME: boolean = true;
    public business_group_PYME: boolean = true;
    public PYME: boolean = true;
    public tecnic_memory_PYME: boolean = true;
    public documentsTypePyme: DocumentsType;


    constructor(public catalogService: CatalogsService) { }

    ngOnInit(): void {
      this.genericsDocsType();
     }
    saveDocument(ev) {
        this[ev.controlName] = false;
        saveDocument(this.fileListPy, ev);
      }
      
      genericsDocsType(){
        this.catalogService.getCatalogByCode(ConceptConstants.LINEA_RESISTIR_PYME_DOCUMENTS).subscribe(
          data => this.documentsTypePyme = data 
        )
      }
      deleteDocument(ev) {
        this[ev.controlName] = true;
        deleteDocument(this.fileListPy, ev);
      }
}
