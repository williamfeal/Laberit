import { Component, Input, OnInit } from '@angular/core';
import { FileModel } from 'src/app/models/file.model';
import { deleteDocument, saveDocument } from '../AppUtils.component';

@Component({
    selector: 'app-sociedad-civil',
    templateUrl: './sociedadCivil.component.html'
})
export class SociedadCivilComponent implements OnInit {
    @Input() validate: boolean;
    @Input() fileListSo: FileModel[] = [];
    public society_constitution_civil: boolean = true;
    public declarations_rent_civil: boolean = true;
    public model_390_civil: boolean = true;
    public model_184_entities_civil: boolean = true;
    public voucher_pay_civil: boolean = true;
    public model_130_131_civil: boolean = true;
    public model_347_civil: boolean = true;
    public registered_office_civil: boolean = true;

    constructor() { }

    ngOnInit(): void { }
    saveDocument(ev) {
        this[ev.controlName] = false;
        saveDocument(this.fileListSo, ev);
    }
    
    deleteDocument(ev) {
        this[ev.controlName] = true;
        deleteDocument(this.fileListSo, ev);
    }
}
