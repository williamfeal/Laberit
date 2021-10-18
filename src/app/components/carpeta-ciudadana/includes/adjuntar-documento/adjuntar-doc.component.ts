import { ActivatedRoute, Router } from '@angular/router';
import { CarpetaService } from 'src/app/services/trex-service/carpeta.service';
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
import { FileModel } from 'src/app/models/file.model';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
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
    private activatedRoute:ActivatedRoute
    ) {

      this.procedureService.getProcedureById(sessionStorage.getItem('idProcedure')).pipe(
        takeUntil(this.unsubscribe$)
      ).subscribe(
        data => this.procedure = data
      )
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.loadedFileList.currentValue !== undefined) {
      this.fileList = changes.loadedFileList.currentValue;
    }
  }

  ngOnInit(): void {
    this.getDraft();
    
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
      this.carpetaService.getDraftById(this.activatedRoute.snapshot.queryParams.draft).subscribe(
        data => {
          this.draft = data;
          this.draftAdjuntarDoc = JSON.parse(data.info).formAdjuntarDoc;

        } 
      )
    }
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
    console.log(this.formAdjuntarDoc.value)
    if(this.formAdjuntarDoc.valid) {
      this.validate = false;
      this.saveDraftAndNavigate();
      
    } else{
      this.validate = true;
    }
  }

  private saveDraftAndNavigate() {
    if(this.draft) {
      const infoJSON = JSON.parse(this.draft.info);
      infoJSON.formAdjuntarDoc = this.formAdjuntarDoc.value;

      this.draft.info = JSON.stringify(infoJSON);
      this.carpetaService.saveDraft(this.draft).subscribe(
          () => this.router.navigate(['carpeta-del-ciudadano/aceptacion'], { queryParams: { draft: this.draft.key }})
      )
    } else {
        this.router.navigate(['carpeta-del-ciudadano/aceptacion']);
    }     
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
    
  }
}
