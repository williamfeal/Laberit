import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { FileModel } from 'src/app/models/file.model';
import { deleteDocument, saveDocument } from '../AppUtils.component';

@Component({
    selector: 'app-autonoms',
    templateUrl: './autonoms.component.html'
})
export class AutonomsComponent implements OnInit {
    @Input() fileListAu: FileModel[] = [];
    @Input() validate: boolean;
    public tax_returns: boolean = true;
    public self_assessment: boolean = true;
    public model_RLC: boolean = true;
    public model_347_: boolean = true;
    public model_390: boolean = true;
    constructor() { }

    ngOnInit(): void {
        console.log(this.validate);
    }

    saveDocument(ev) {
        saveDocument(this.fileListAu, ev);
        this[ev.controlName] = false;
    }
    deleteDocument(ev) {
        this[ev.controlName] = true;
        deleteDocument(this.fileListAu, ev);

    }
}
