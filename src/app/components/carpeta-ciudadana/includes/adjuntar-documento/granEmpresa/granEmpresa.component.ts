import { Component, Input, OnInit } from '@angular/core';
import { FileModel } from 'src/app/models/file.model';

@Component({
    selector: 'app-gran-empresa',
    templateUrl: './granEmpresa.component.html'
})
export class GranEmpresaComponent implements OnInit {
    @Input() fileListGr: FileModel[] = [];

    constructor() { }

    ngOnInit(): void { }

    saveDocument(ev){
        this.fileListGr.push(ev);
        console.log(this.fileListGr);
    }
    deleteDocument(ev) {
        const fileIndex = this.fileListGr.indexOf(ev);
        this.fileListGr.splice(fileIndex, 1);
    }
}
