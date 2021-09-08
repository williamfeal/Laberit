import { Component, Input, OnInit } from '@angular/core';
import { FileModel } from 'src/app/models/file.model';

@Component({
    selector: 'app-pyme',
    templateUrl: './PYME.component.html'
})
export class PymeComponent implements OnInit {
    @Input() fileListPy: FileModel[] = [];

    constructor() { }

    ngOnInit(): void { }
    saveDocument(ev){
        this.fileListPy.push(ev);
        console.log(this.fileListPy);
    }
    deleteDocument(ev) {
        const fileIndex = this.fileListPy.indexOf(ev);
        this.fileListPy.splice(fileIndex, 1);
    }
}
