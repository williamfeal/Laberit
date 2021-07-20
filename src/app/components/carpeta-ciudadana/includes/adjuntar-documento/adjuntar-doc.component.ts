import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-adjuntar-documento',
  templateUrl: './adjuntar-doc.component.html',
  styleUrls: ['./adjuntar-doc.component.scss']
})
export class AdjuntarDocComponent implements OnInit {
    public fileName = '';
    public hasFile = false;
    public canDelete = false;
    public documentIcon = '';
    @Output() public uploadFileDocument = new EventEmitter<string | ArrayBuffer | null>();
    @Output() public fileContentBase = new EventEmitter<string>();
  
    private fileSize = 0;
    public fileContent!: string;
    private fileReader = new FileReader();
    @ViewChild('fileUploader') private fileUploader: ElementRef | undefined;
    @ViewChild('archivoName') private archivoName: ElementRef | undefined;

  constructor() { }

  ngOnInit(): void {
  }
editInput(event: any){
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
        this.fileName = file.name;
        this.fileSize = file.size;
        this.fileContent = this.fileReader.result as string;
        this.uploadFileDocument.emit(this.fileReader.result);
        this.fileContentBase.emit(this.fileContent);
        this.documentIcon = fileExtension;
        this.archivoName.nativeElement.value = this.fileName;
      };
      this.hasFile = true;
      this.canDelete = true;
}
saveName(e:any){
    let label = e.target;
    console.log(label);
}
removeFile(){
    this.archivoName.nativeElement.value = '';
    this.hasFile = false;
    this.canDelete = false;
    // @ts-ignore
    this.fileUploader?.nativeElement.value = '';
}
}
