import { ChangeDetectorRef, Component, EventEmitter, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Draft } from 'src/app/models/draft.model';
import { FileModel } from 'src/app/models/file.model';
import { Procedure } from 'src/app/models/procedure.model';
import { DraftsService } from 'src/app/services/acli-service/drafts.service';
import { ProceduresService } from 'src/app/services/moges-services/procedures.service';
import { DocumentsType } from 'src/app/shared/form/fields/input-document/input-document';
import { AppUtils } from 'src/app/utils/app-utils';
import { SwalUtils } from 'src/app/utils/swal-utils';
import { deleteDocument, saveDocument } from '../adjuntar-documento/AppUtils.component';

@Component({
  selector: 'app-adjuntar-doc-afin',
  templateUrl: './adjuntar-doc-afin.component.html',
})
export class AdjuntarDocAfin implements OnInit {

  public fileList: FileModel[] = [];
  public tipo_empresa: string = '';
  public requi: boolean = true;
  public formAdjuntarDoc: FormGroup;
  public documentsType: DocumentsType;
  public draft: Draft;
  public showErrors = false;
  public draftAdjuntarDoc;
  public viewMyRequest: string = 'documents';
  @Output() public uploadFileDocument = new EventEmitter<FileModel[]>();
  public procedure;
  public validate: boolean = false;
  private unsubscribe$ = new Subject<void>();
  public textError;

  constructor(
    private router: Router,
    private procedureService: ProceduresService,
    private cdRef: ChangeDetectorRef,
    private draftService: DraftsService,
    private translateService: TranslateService,
    private activatedRoute: ActivatedRoute,
    public appUtils: AppUtils
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.loadedFileList.currentValue !== undefined) {
      this.fileList = changes.loadedFileList.currentValue;
    }
  }

  ngOnInit(): void {
    this.procedureService.getProcedureById(sessionStorage.getItem('idProcedure')).pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe(
      (data: Procedure) => {
        this.procedure = data;
        this.getDraft();

      })

    if (sessionStorage.getItem('company_type')) {
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

    this.translateService.get('error_texts.pop_up.form_error').pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe(
      text => {
        console.log(text);
        this.textError = text;
      }
    )
  }

  ngAfterViewChecked() {
    this.cdRef.detectChanges();
  }

  private getDraft() {
    if (this.activatedRoute.snapshot.queryParams.draft) {
      this.draftService.getDraftById(this.activatedRoute.snapshot.queryParams.draft + ':forms:documents').subscribe(
        (data: Draft) => {
          if (data !== null) {
            this.draft = data;
            this.draftAdjuntarDoc = JSON.parse(data.info);
            this.fileList = this.draftAdjuntarDoc
          } else {
            this.setDraft();
          }
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
      'info',sessionStorage.getItem('nombreTitular'), this.activatedRoute.snapshot.queryParams.draft);
  }

  public saveDocument(ev) {
    this[ev.controlName] = false;
    saveDocument(this.fileList, ev);
  }

  public deleteDocument(ev) {
    this[ev.controlName] = true;
    deleteDocument(this.fileList, ev);
  }

  public goToRequestInfo() {
    if (this.formAdjuntarDoc.valid) {
      this.validate = false;
      this.saveDraftAndNavigate();
    } else {
      SwalUtils.showErrorAlert(this.textError.title, this.textError.docs)
      this.validate = true;
    }
  }

  private saveDraftAndNavigate() {
    const draft: Draft = new Draft(sessionStorage.getItem('nifTitular'), 'BORRADOR', JSON.stringify(this.fileList), this.procedure.category.name,
      this.draft.producto, 'forms:documents',this.draft.nombre, this.draft.key, '');
    if (this.procedure.rutaFormulario === "afin-invierte-micro") {
      this.draftService.saveDraft(draft).subscribe(
        () => this.router.navigate(['carpeta-del-ciudadano/afin-aceptacion'], {
          queryParams: { draft: this.draft.key }
        })
      )
    } else {
      this.draftService.saveDraft(draft).subscribe(
        () => this.router.navigate(['carpeta-del-ciudadano/aceptacion'], {
          queryParams: { draft: this.draft.key }
        })
      )
    }
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
  return() {
    this.appUtils.return();
  }
}
