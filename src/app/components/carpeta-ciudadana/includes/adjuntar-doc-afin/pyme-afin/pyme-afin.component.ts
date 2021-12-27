import { CatalogsService } from 'src/app/services/catalogs/catalogs.service';
import {
  Component,
  Input,
  OnChanges,
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
  selector: 'app-pyme-afin',
  templateUrl: './pyme-afin.component.html'
})
export class PymeAfinComponent implements OnInit, OnChanges {
  @Input() fileListPy: FileModel[] = [];
  @Input() validate: boolean;
  @Input() draft:any;

  public documentsTypePyme: DocumentsType;
  public draftPYME;

  private unsubscribe$ = new Subject<void>();

  public mandatoryDocs: DocumentsType[];
  public optionalDocs: DocumentsType[];
  @Input() formAdjPyme: FormGroup;
  constructor(public catalogService: CatalogsAfinService) { }

  ngOnInit(): void {
    this.getMandatoryDocs();
    this.getOptionalDocs();
  }

  ngOnChanges(changes:SimpleChanges) {
    if(changes.draft && !isEmptyObject(this.draft) && !isEmptyObject(this.draft.pyme)) {
        this.draftPYME = this.draft
    }
}

  saveDocument(ev) {
    this[ev.controlName] = false;
    saveDocument(this.fileListPy, ev);
  }

  private getMandatoryDocs() {
    this.catalogService.getCatalogByCodeAtConcept(ConceptConstants.MANDATORY_DOCS_AFIN,ConceptConstants.LINEA_RESISTIR_PYME_MANDATORY_DOCUMENTS).pipe(
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
        this.catalogService.getCatalogByCodeAtConcept(ConceptConstants.OPTIONAL_DOCS_AFIN,ConceptConstants.LINEA_RESISTIR_PYME_OPTIONAL_DOCUMENTS).pipe(
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
    this.catalogService.getCatalogByCodeAtConcept(ConceptConstants.TEMPLATES_DOCS_AFIN,concept.concept_code).subscribe((data)=>{
        concept.descriptionPlantilla = data[0].description;    
    })
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
