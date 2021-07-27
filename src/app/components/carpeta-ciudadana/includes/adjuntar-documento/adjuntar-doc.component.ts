import { Component, ElementRef, EventEmitter, Input, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FileModel } from 'src/app/models/file.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-adjuntar-documento',
  templateUrl: './adjuntar-doc.component.html',
  styleUrls: ['./adjuntar-doc.component.scss']
})
export class AdjuntarDocComponent implements OnInit {
  public fileList: FileModel[] = [];

  @Input() public loadedFileList?: FileModel[] = [];
  @Input() public action?= '';

  @Output() public uploadFileDocument = new EventEmitter<FileModel[]>();

  @ViewChild('fileUploader') private fileUploader: ElementRef | undefined;

  private fileReader = new FileReader();

  constructor(private router:Router) { }
  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.loadedFileList.currentValue !== undefined) {
      this.fileList = changes.loadedFileList.currentValue;
    }
  }
  ngOnInit(): void {
  }
  public uploadFile(event: any): void {
    const file = event.dataTransfer ? event.dataTransfer.files[0] : event.target.files[0];
    const fileExtension = file.name.split('.').pop();

    if (!file.name || fileExtension !== 'pdf' && fileExtension !== 'doc' && fileExtension !== 'docx') {
      Swal.fire('Extensión no permitida', 'Las extensiones de archivo permitidas son: .pdf, .doc, .docx', 'info').then();
      return;
    }
    if (file.size > 52428800) {
      Swal.fire('Tamaño inválido', 'Archivo demasiado grande. Máximo permitido: 50 MB.', 'info').then();
      return;
    }

    this.fileReader.readAsDataURL(file);
    this.fileReader.onload = () => {
      const extension = fileExtension !== 'pdf' ? 'fas fa-file-word' : 'fas fa-file-pdf';
      const newFile = new FileModel(file.name, extension);

      newFile.eliminado = false;
      newFile.idInt = this.fileList.length + 1;
      newFile.base64 = this.fileReader.result?.toString().split(',')[1];

      this.fileList.push(newFile);

      this.uploadFileDocument.emit(this.fileList);
    };
  }
  public removeFile(fileToDelete: FileModel): void {
    const fileIndex = this.fileList.indexOf(fileToDelete);
    this.fileList.splice(fileIndex);
    this.uploadFileDocument.emit(this.fileList);
  }
  public goToRequestInfo() {
    this.router.navigate(['carpeta-del-ciudadano/firmar'], {
      state: {
        data: {
          holi:'holi'
        }
      }
});
}
}
