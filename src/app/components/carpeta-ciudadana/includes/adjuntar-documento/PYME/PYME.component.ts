import { CatalogsService } from 'src/app/services/catalogs/catalogs.service';
import {
  Component,
  Input,
  OnChanges,
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
  selector: 'app-pyme',
  templateUrl: './PYME.component.html'
})
export class PymeComponent implements OnInit, OnChanges {
  @Input() fileListPy: FileModel[] = [];
  @Input() validate: boolean;
  @Input() draft:any;

  public documentsTypePyme: DocumentsType;
  public draftPYME;

  private unsubscribe$ = new Subject<void>();

  public mandatoryDocs: DocumentsType[];
  public optionalDocs: DocumentsType[];
  @Input() formAdjPyme: FormGroup;
  constructor(public catalogService: CatalogsService) { }

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
    this.catalogService.getCatalogByCode(ConceptConstants.LINEA_RESISTIR_PYME_MANDATORY_DOCUMENTS).pipe(
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
        this.catalogService.getCatalogByCode(ConceptConstants.LINEA_RESISTIR_PYME_OPTIONAL_DOCUMENTS).pipe(
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
