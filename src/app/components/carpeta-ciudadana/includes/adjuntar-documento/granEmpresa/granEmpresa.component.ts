import { Component, Input, OnInit } from '@angular/core';
import { FileModel } from 'src/app/models/file.model';
import { deleteDocument, saveDocument } from '../AppUtils.component';

@Component({
    selector: 'app-gran-empresa',
    templateUrl: './granEmpresa.component.html'
})
export class GranEmpresaComponent implements OnInit {
    @Input() validate: boolean;
    public tecnic_memory_big: boolean = true;
    public PYME_big: boolean = true;
    public business_group_big = true;
    public registered_office_big = true; 
    public risk_inform_big = true;
    public tax_returns_big = true;
    public _commercial_code_big = true;
    public annual_accounts_big = true;
    public legal_representative_big = true;
    public beneficial_ownership_big = true;
    public society_constitution_big = true;
    @Input() fileListGr: FileModel[] = [];

    constructor() { }

    ngOnInit(): void { }

    saveDocument(ev){
        this[ev.controlName] = false;
        saveDocument(this.fileListGr, ev);
    }
    deleteDocument(ev) {
        this[ev.controlName] = true;
        deleteDocument(this.fileListGr, ev);
    }
}
