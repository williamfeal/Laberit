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
  selector: 'app-micro-empresa',
  templateUrl: './microEmpresa.component.html'
})
export class MicroEmpresaComponent implements OnInit {
  @Input() fileListMi: FileModel[] = [];
  @Input() validate: boolean;
  @Input() formAdjMicro: FormGroup;
  @Input() draft:any;

  public documentsTypeMicroBussines: DocumentsType;
  public draftMicroEmpresa;
  
  public mandatoryDocs: DocumentsType[];
  public optionalDocs: DocumentsType[];

  private unsubscribe$ = new Subject<void>();
  
  constructor(public catalogService: CatalogsService) { }

  ngOnInit(): void {
    this.getMandatoryDocs();
    this.getOptionalDocs();

  }

  ngOnChanges(changes:SimpleChanges) {
    if(changes.draft && !isEmptyObject(this.draft) && !isEmptyObject(this.draft.micro_empresa)) {
        this.draftMicroEmpresa = this.draft
    }
  }

  saveDocument(ev) {
    this[ev.controlName] = false;
    saveDocument(this.fileListMi, ev);
  }

  async getTemplates(concept: any){
    this.catalogService.getCatalogByCode(concept.concept_code).subscribe((data)=>{
        concept.descriptionPlantilla = data[0].description;    
    })
  }

  private getMandatoryDocs() {
    this.catalogService.getCatalogByCode(ConceptConstants.LINEA_RESISTIR_MICROBUSINESS_MANDATORY_DOCUMENTS).pipe(
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
        this.catalogService.getCatalogByCode(ConceptConstants.LINEA_RESISTIR_MICROBUSINESS_OPTIONAL_DOCUMENTS).pipe(
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

  genericsDocsType() {
    this.catalogService.getCatalogByCode(ConceptConstants.LINEA_RESISTIR_MICRO_BUISSINES_DOCUMENTS).pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe(
      data => {
        data.forEach(element => {
          this.getTemplates(element);    
      });
      this.documentsTypeMicroBussines = data; 
      }
    )
  }

  deleteDocument(ev) {
    this[ev.controlName] = true;
    deleteDocument(this.fileListMi, ev);
  }
  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
