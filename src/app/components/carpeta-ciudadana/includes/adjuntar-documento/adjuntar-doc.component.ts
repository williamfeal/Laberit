import { ChangeDetectorRef, Component, EventEmitter, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { FileModel } from 'src/app/models/file.model';
import { ProceduresService } from 'src/app/services/moges-services/procedures.service';
import { saveDocument, deleteDocument } from './AppUtils.component';
import { CatalogsService } from 'src/app/services/catalogs/catalogs.service';
import { ConceptConstants } from 'src/app/utils/constants/concept-constants';
import { DocumentsType } from 'src/app/shared/form/fields/input-document/input-document';

@Component({
  selector: 'app-adjuntar-documento',
  templateUrl: './adjuntar-doc.component.html',
  styleUrls: ['./adjuntar-doc.component.scss']
})
export class AdjuntarDocComponent implements OnInit {

  public fileList: FileModel[] = [];
  public tipo_empresa: string = '';
  public documentNif: boolean = true;
  public documentHelp: boolean = true;
  public responsible_declaration: boolean = true;
  public model_303: boolean = true;
  public distribution_by_year: boolean = true;
  public requi: boolean = true;
  public documentsType: DocumentsType;
  @Output() public uploadFileDocument = new EventEmitter<FileModel[]>();

  public procedure;
  public formDocument: FormGroup;
  public validate: boolean = false;


  constructor(private router: Router,
    private procedureService: ProceduresService,
    private cdRef: ChangeDetectorRef,
    private fb: FormBuilder,
    public catalogService: CatalogsService
    ) {

    this.procedureService.getProcedureById(sessionStorage.getItem('idProcedure')).subscribe(
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
      console.log(this.tipo_empresa);

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
    if (this.tipo_empresa === 'ivf-representative-types-juridic-person-autonomous' && this.fileList.length == 10 || this.tipo_empresa === 'ivf-representative-types-juridic-person-community-of-goods' && this.fileList.length == 13
    || this.tipo_empresa === 'ivf-representative-types-juridic-person-micro-business' && this.fileList.length == 16 || this.tipo_empresa === 'ivf-representative-types-juridic-person-pyme' && this.fileList.length == 18 ||
    this.tipo_empresa === 'ivf-representative-types-juridic-person-big-company' && this.fileList.length == 16 || this.tipo_empresa === 'ivf-representative-types-juridic-person-civil-society' && this.fileList.length == 13) {
      console.log(this.fileList);
      this.validate = false;
      this.router.navigate(['carpeta-del-ciudadano/aceptacion']);
    } else {
      this.validate = true;
      console.log(this.validate);
    }
  }
}
