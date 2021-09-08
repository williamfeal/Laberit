import { Component, Input, OnInit } from '@angular/core';
import { FileModel } from 'src/app/models/file.model';

@Component({
    selector: 'app-comunidadBienes',
    templateUrl: './comunidad.component.html'
})
export class ComunidadBienesComponent implements OnInit {
    @Input() fileListCo: FileModel[] = [];

    constructor() { }

    ngOnInit(): void { }

    saveDocument(ev){
        this.fileListCo.push(ev);
        console.log(this.fileListCo);
    }
    deleteDocument(ev) {
        const fileIndex = this.fileListCo.indexOf(ev);
        this.fileListCo.splice(fileIndex, 1);
    }
}
