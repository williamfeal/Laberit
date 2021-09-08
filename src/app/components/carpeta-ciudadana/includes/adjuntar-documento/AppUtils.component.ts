import { Component, OnInit } from '@angular/core';
import { FileModel } from 'src/app/models/file.model';

declare function saveDocument(event);
declare function deleteDocument(event);

@Component({
    template: ''
})
export class AppUtilsAdjuntar implements OnInit {
    public fileList: FileModel[] = [];
    constructor() { }

    ngOnInit(): void { }

    saveDocument(ev) {
        this.fileList.push(ev);
    }
    deleteDocument(ev) {
        const fileIndex = this.fileList.indexOf(ev);
        this.fileList.splice(fileIndex, 1);
    }
}
