import { ActivatedRoute, Router } from '@angular/router';
import { CarpetaService } from 'src/app/services/acli-service/carpeta.service';
import { CatalogsService } from 'src/app/services/catalogs/catalogs.service';
import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  OnInit,
  Output,
  SimpleChanges
  } from '@angular/core';
import { deleteDocument, saveDocument } from './AppUtils.component';
import { DocumentsType } from 'src/app/shared/form/fields/input-document/input-document';
import { Draft } from 'src/app/models/draft.model';
import { DraftsService } from './../../../../services/acli-service/drafts.service';
import { FileModel } from 'src/app/models/file.model';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Procedure } from './../../../../models/procedure.model';
import { ProceduresService } from 'src/app/services/moges-services/procedures.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
 

@Component({
  selector: 'app-adjuntar-documento',
  templateUrl: './adjuntar-doc.component.html',
  styleUrls: ['./adjuntar-doc.component.scss']
})
export class AdjuntarDocComponent implements OnInit {

  public fileList: FileModel[] = [];
  public tipo_empresa: string = '';
  public requi: boolean = true;
  public formAdjuntarDoc: FormGroup;
  public documentsType: DocumentsType;
  public draft:Draft;
  public draftAdjuntarDoc;

  @Output() public uploadFileDocument = new EventEmitter<FileModel[]>();

  public procedure;
  public validate: boolean = false;
  private unsubscribe$ = new Subject<void>();

  constructor(private router: Router,
    private procedureService: ProceduresService,
    private cdRef: ChangeDetectorRef,
    private fb: FormBuilder,
    private carpetaService: CarpetaService,
    private draftService:DraftsService,
    private activatedRoute:ActivatedRoute
    ) {

     
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.loadedFileList.currentValue !== undefined) {
      this.fileList = changes.loadedFileList.currentValue;
    }
  }

  ngOnInit(): void {
    this.procedureService.getProcedureById(sessionStorage.getItem('idProcedure')).pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe(
      (data:Procedure) => {
        this.procedure = data;
        this.getDraft();

      })
    
    if(sessionStorage.getItem('company_type')) {
      this.tipo_empresa = sessionStorage.getItem('company_type');
      this.formAdjuntarDoc = new FormGroup({
        autonomous: new FormGroup({}),
        cominidad_bienes: new FormGroup({}),
        gran_empresa: new FormGroup({}),
        micro_empresa: new FormGroup({}),
        pyme: new FormGroup({}),
        sociedad_civil: new FormGroup({})
      });
    }
  }
  
  ngAfterViewChecked() {
    this.cdRef.detectChanges();
  }

  private getDraft() {
    if(this.activatedRoute.snapshot.queryParams.draft) {
      this.draftService.getDraftById(this.activatedRoute.snapshot.queryParams.draft + ':forms:documents').subscribe(
        (data:Draft) => {
          this.draft = data;
          this.draftAdjuntarDoc = JSON.parse(data.info);
          this.fileList = this.draftAdjuntarDoc
        },
        () => this.setDraft()
      )
    }
  }

  private setDraft() {
    const info = { idProcedure: sessionStorage.getItem('idProcedure') };
    const infoProcedure = this.procedure.languages.find(
      language => language.codigo === localStorage.getItem('lang')
    );
    this.draft = new Draft(sessionStorage.getItem('nifTitular'), 'Borrador', JSON.stringify(info), this.procedure.category.name, infoProcedure.name,
      'info', this.activatedRoute.snapshot.queryParams.draft);
  }

  saveDocument(ev) {
    this[ev.controlName] = false;
    saveDocument(this.fileList, ev);
  }

  deleteDocument(ev) {
    this[ev.controlName] = true;
    deleteDocument(this.fileList, ev);
  }

  validationDocuments() {

  }

  public goToRequestInfo() {
    if(this.formAdjuntarDoc.valid) {
      this.validate = false;
      this.saveDraftAndNavigate();
      
    } else{
      this.validate = true;
    }
  }

  private saveDraftAndNavigate() { 
    const draft:Draft = new Draft(sessionStorage.getItem('nifTitular'), 'BORRADOR', JSON.stringify(this.fileList), this.procedure.category.name,
      this.draft.producto, 'forms:documents', this.draft.key, '');

    this.draftService.saveDraft(draft).subscribe(
      () => this.router.navigate(['carpeta-del-ciudadano/aceptacion'], {
        queryParams: { draft: this.draft.key }
      })
    )    
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
    
  }
}
