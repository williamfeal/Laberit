import { Component, EventEmitter, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { FileModel } from 'src/app/models/file.model';
import { ProceduresService } from 'src/app/services/moges-services/procedures.service';
@Component({
  selector: 'app-adjuntar-documento',
  templateUrl: './adjuntar-doc.component.html',
  styleUrls: ['./adjuntar-doc.component.scss']
})
export class AdjuntarDocComponent implements OnInit {

  public fileList: FileModel[] = [];

  @Output() public uploadFileDocument = new EventEmitter<FileModel[]>();

  public procedure;
  public formDocument: FormGroup;
  validate: boolean = false;


  constructor(private router: Router, private procedureService: ProceduresService) {

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
    this.newForm();
  }
  newForm() {
    this.formDocument = new FormGroup({
      documentNif: new FormGroup({}),
      documentHelp: new FormGroup({})
    });
  }

  saveDocument(ev) {

    this.fileList.push(ev);
    this.validate = false;
  }

  deleteDocument(ev) {
    const fileIndex = this.fileList.indexOf(ev);
    this.fileList.splice(fileIndex, 1);
  }

  public goToRequestInfo() {
    //validar si estan todos los documentos
    if (!this.formDocument.valid) {
      // this.router.navigate(['carpeta-del-ciudadano/firmar']);
    } else {
      this.validate = true;
    }
  }
}
