import { Component, Input, OnInit } from '@angular/core';
import { FileModel } from 'src/app/models/file.model';

@Component({
    selector: 'app-sociedad-civil',
    templateUrl: './sociedadCivil.component.html'
})
export class SociedadCivilComponent implements OnInit {
    @Input() fileListSo: FileModel[] = [];

    constructor() { }

    ngOnInit(): void { }
    saveDocument(ev){
        this.fileListSo.push(ev);
        console.log(this.fileListSo);
    }
    deleteDocument(ev) {
        const fileIndex = this.fileListSo.indexOf(ev);
        this.fileListSo.splice(fileIndex, 1);
    }
}
