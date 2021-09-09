import { Component, Input, OnInit } from '@angular/core';
import { FileModel } from 'src/app/models/file.model';
import { deleteDocument, saveDocument } from '../AppUtils.component';

@Component({
    selector: 'app-comunidadBienes',
    templateUrl: './comunidad.component.html'
})
export class ComunidadBienesComponent implements OnInit {
    @Input() fileListCo: FileModel[] = [];
    @Input() validate: boolean;
    public registered_office_community: boolean = true;
    public model_347_community: boolean = true;
    public model_130_131_community: boolean = true;
    public voucher_pay_community: boolean = true;
    public model_390_community: boolean = true;
    public model_184_entities_community: boolean = true;
    public declarations_rent_community: boolean = true;
    public society_constitution_community: boolean = true;

    constructor() { }

    ngOnInit(): void { }

    saveDocument(ev) {
        this[ev.controlName] = false;
        saveDocument(this.fileListCo, ev);
    }
    deleteDocument(ev) {
        this[ev.controlName] = true;
        deleteDocument(this.fileListCo, ev);
    }
}
