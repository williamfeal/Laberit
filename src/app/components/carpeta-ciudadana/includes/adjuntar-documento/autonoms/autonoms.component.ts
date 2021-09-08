import { Component, Input, OnInit } from '@angular/core';
import { FileModel } from 'src/app/models/file.model';
import { AppUtilsAdjuntar } from '../AppUtils.component';

@Component({
    selector: 'app-autonoms',
    templateUrl: './autonoms.component.html'
})
export class Autonoms implements OnInit {
    @Input() fileListAu: FileModel[] = [];
    constructor() { }

    ngOnInit(): void { }

    saveDocument(ev){
        this.fileListAu.push(ev);
        console.log(this.fileListAu);
    }
    deleteDocument(ev) {
        const fileIndex = this.fileListAu.indexOf(ev);
        this.fileListAu.splice(fileIndex, 1);
    }
}
