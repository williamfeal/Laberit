import { Component, Input, OnInit } from '@angular/core';
import { FileModel } from 'src/app/models/file.model';

@Component({
    selector: 'app-micro-empresa',
    templateUrl: './microEmpresa.component.html'
})
export class MicroEmpresaComponent implements OnInit {
    @Input() fileListMi: FileModel[] = [];

    constructor() { }

    ngOnInit(): void { }
    saveDocument(ev){
        this.fileListMi.push(ev);
        console.log(this.fileListMi);
    }
    deleteDocument(ev) {
        const fileIndex = this.fileListMi.indexOf(ev);
        this.fileListMi.splice(fileIndex, 1);
    }
}
