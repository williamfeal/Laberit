import { ChangeDetectorRef, Component, EventEmitter, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { FileModel } from 'src/app/models/file.model';
import { ProceduresService } from 'src/app/services/moges-services/procedures.service';
import { saveDocument, deleteDocument } from './AppUtils.component';
@Component({
  selector: 'app-adjuntar-documento',
  templateUrl: './adjuntar-doc.component.html',
  styleUrls: ['./adjuntar-doc.component.scss']
})
export class AdjuntarDocComponent implements OnInit {

  public fileList: FileModel[] = [];
  public tipo_empresa: string = "sociedad_civil";
  public documentNif: boolean = true;
  public documentHelp: boolean = true;
  public responsible_declaration: boolean = true;
  public model_303: boolean = true;
  public distribution_by_year: boolean = true;
  public requi: boolean = true;
  @Output() public uploadFileDocument = new EventEmitter<FileModel[]>();

  public procedure;
  public formDocument: FormGroup;
  public validate: boolean = false;


  constructor(private router: Router,
    private procedureService: ProceduresService,
    private cdRef: ChangeDetectorRef,
    private fb: FormBuilder) {

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
    //validar si estan todos los documentos
    

    if (this.tipo_empresa === 'autonomo' && this.fileList.length == 10 || this.tipo_empresa === 'comunidad_bienes' && this.fileList.length == 13
    || this.tipo_empresa === 'micro_empresa' && this.fileList.length == 16 || this.tipo_empresa === 'PYME' && this.fileList.length == 18 ||
    this.tipo_empresa === 'big_bussines' && this.fileList.length == 16 || this.tipo_empresa === 'sociedad_civil' && this.fileList.length == 13) {
      console.log(this.fileList);
      this.validate = false;
      this.router.navigate(['carpeta-del-ciudadano/aceptacion']);
    } else {
      this.validate = true;
      console.log(this.validate);
    }
  }
}
