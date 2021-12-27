import {
    Component,
    Input,
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
    selector: 'app-micro-empresa-afin',
    templateUrl: './microEmpresa-afin.component.html'
  })
  export class MicroEmpresaAfinComponent implements OnInit {
    @Input() fileListMi: FileModel[] = [];
    @Input() validate: boolean;
    @Input() formAdjMicro: FormGroup;
    @Input() draft: any;
  
    public documentsTypeMicroBussines: DocumentsType;
    public draftMicroEmpresa;
  
    public mandatoryDocs: DocumentsType[];
    public optionalDocs: DocumentsType[];
  
    private unsubscribe$ = new Subject<void>();
  
    constructor(public catalogService: CatalogsAfinService) { }
  
    ngOnInit(): void {
      this.getMandatoryDocs();
      this.getOptionalDocs();
  
    }
  
    ngOnChanges(changes: SimpleChanges) {
      if (changes.draft && !isEmptyObject(this.draft) && !isEmptyObject(this.draft.micro_empresa)) {
        this.draftMicroEmpresa = this.draft
      }
    }
  
    saveDocument(ev) {
      this[ev.controlName] = false;
      saveDocument(this.fileListMi, ev);
    }
  
    async getTemplates(concept: any) {
      this.catalogService.getCatalogByCodeAtConcept(ConceptConstants.TEMPLATES_DOCS_AFIN, concept.concept_code).subscribe((data) => {
        concept.descriptionPlantilla = data[0].description;
      })
    }
  
    private getMandatoryDocs() {
      this.catalogService.getCatalogByCodeAtConcept(ConceptConstants.MANDATORY_DOCS_AFIN, ConceptConstants.DOCS_AFIN_MICRO_BUSINESS).pipe(
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
      this.catalogService.getCatalogByCodeAtConcept(ConceptConstants.OPTIONAL_DOCS_AFIN, ConceptConstants.DOCS_AFIN_MICRO_BUSINESS).pipe(
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
  
  
    deleteDocument(ev) {
      this[ev.controlName] = true;
      deleteDocument(this.fileListMi, ev);
    }
    ngOnDestroy(): void {
      this.unsubscribe$.next();
      this.unsubscribe$.complete();
    }
  }
  