import { ChangeDetectorRef, Component, EventEmitter, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { FileModel } from 'src/app/models/file.model';
import { ProceduresService } from 'src/app/services/moges-services/procedures.service';
import { saveDocument, deleteDocument } from './AppUtils.component';
import { CatalogsService } from 'src/app/services/catalogs/catalogs.service';
import { DocumentsType } from 'src/app/shared/form/fields/input-document/input-document';
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
  @Output() public uploadFileDocument = new EventEmitter<FileModel[]>();

  public procedure;
  public validate: boolean = false;
  private unsubscribe$ = new Subject<void>();

  constructor(private router: Router,
    private procedureService: ProceduresService,
    private cdRef: ChangeDetectorRef,
    private fb: FormBuilder,
    public catalogService: CatalogsService
    ) {

    this.procedureService.getProcedureById(sessionStorage.getItem('idProcedure')).pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe(
      data => this.procedure = data
    )
  }
  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.loadedFileList.currentValue !== undefined) {
      this.fileList = changes.loadedFileList.currentValue;
    }
  }
  ngOnInit(): void {
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
    console.log(this.tipo_empresa);
  }
  
  ngAfterViewChecked() {
    this.cdRef.detectChanges();
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
    console.log(this.formAdjuntarDoc);
    if(this.formAdjuntarDoc.valid){
    // if (this.tipo_empresa === 'ivf-representative-types-juridic-person-autonomous' && this.fileList.length == 10 || this.tipo_empresa === 'ivf-representative-types-juridic-person-community-of-goods' && this.fileList.length == 13
    // || this.tipo_empresa === 'ivf-representative-types-juridic-person-micro-business' && this.fileList.length == 16 || this.tipo_empresa === 'ivf-representative-types-juridic-person-pyme' && this.fileList.length == 18 ||
    // this.tipo_empresa === 'ivf-representative-types-juridic-person-big-company' && this.fileList.length == 16 || this.tipo_empresa === 'ivf-representative-types-juridic-person-civil-society' && this.fileList.length == 13) {
      console.log(this.fileList);
      this.validate = false;
      this.router.navigate(['carpeta-del-ciudadano/aceptacion']);
    // } else {
      
    //}
  }else{
    console.log('NO ES VALIDO');
    this.validate = true;
    console.log(this.validate);
  }
  }
  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
    
  }
}
