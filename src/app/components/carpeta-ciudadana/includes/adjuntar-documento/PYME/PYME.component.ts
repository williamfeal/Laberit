import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
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
  selector: 'app-pyme',
  templateUrl: './PYME.component.html'
})
export class PymeComponent implements OnInit, OnChanges {
  @Input() fileListPy: FileModel[] = [];
  @Input() validate: boolean;
  @Input() draft:any;

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
  public documentNif: boolean = true;
  public documentHelp: boolean = true;
  public responsible_declaration: boolean = true;
  public model_303: boolean = true;
  public distribution_by_year: boolean = true;
  public PYME: boolean = true;
  public tecnic_memory_PYME: boolean = true;
  public documentsTypePyme: DocumentsType;
  public draftPYME;

  private unsubscribe$ = new Subject<void>();

  @Input() formAdjPyme: FormGroup;
  constructor(public catalogService: CatalogsService) { }

  ngOnInit(): void {
    this.genericsDocsType();
  }

  ngOnChanges(changes:SimpleChanges) {
    if(changes.draft && !isEmptyObject(this.draft) && !isEmptyObject(this.draft.pyme)) {
        this.draftPYME = this.draft.pyme
    }
}

  saveDocument(ev) {
    this[ev.controlName] = false;
    saveDocument(this.fileListPy, ev);
  }
  async getTemplates(concept: any){
    this.catalogService.getCatalogByCode(concept.concept_code).subscribe((data)=>{
        concept.descriptionPlantilla = data[0].description;    
    })
}
  genericsDocsType() {
    this.catalogService.getCatalogByCode(ConceptConstants.LINEA_RESISTIR_PYME_DOCUMENTS).pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe(
      data => {
        data.forEach(element => {
          this.getTemplates(element);    
      });
      this.documentsTypePyme = data;
      }
    )
  }
  deleteDocument(ev) {
    this[ev.controlName] = true;
    deleteDocument(this.fileListPy, ev);
  }
  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
