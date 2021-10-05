import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FileModel } from 'src/app/models/file.model';
import { CatalogsService } from 'src/app/services/catalogs/catalogs.service';
import { DocumentsType } from 'src/app/shared/form/fields/input-document/input-document';
import { ConceptConstants } from 'src/app/utils/constants/concept-constants';
import { deleteDocument, saveDocument } from '../AppUtils.component';

@Component({
  selector: 'app-micro-empresa',
  templateUrl: './microEmpresa.component.html'
})
export class MicroEmpresaComponent implements OnInit {
  @Input() fileListMi: FileModel[] = [];
  @Input() validate: boolean;
  @Input() formAdjMicro: FormGroup;
  public beneficial_ownership_micro: boolean = true;
  public society_constitution_micro: boolean = true;
  public legal_representative_micro: boolean = true;
  public annual_accounts_micro: boolean = true;
  public _commercial_code_micro: boolean = true;
  public tax_returns_micro: boolean = true;
  public model_390_micro: boolean = true;
  public model_347_micro: boolean = true;
  public registered_office_micro: boolean = true;
  public PYME_micro: boolean = true;
  public business_group_micro: boolean = true;
  public documentNif: boolean = true;
  public documentHelp: boolean = true;
  public responsible_declaration: boolean = true;
  public model_303: boolean = true;
  public distribution_by_year: boolean = true;
  public documentsTypeMicroBussines: DocumentsType;

  constructor(public catalogService: CatalogsService) { }

  ngOnInit(): void {
    this.genericsDocsType();
  }
  saveDocument(ev) {
    this[ev.controlName] = false;
    saveDocument(this.fileListMi, ev);
  }

  genericsDocsType() {
    this.catalogService.getCatalogByCode(ConceptConstants.LINEA_RESISTIR_MICRO_BUISSINES_DOCUMENTS).subscribe(
      data => this.documentsTypeMicroBussines = data
    )
  }

  deleteDocument(ev) {
    this[ev.controlName] = true;
    deleteDocument(this.fileListMi, ev);
  }
}
