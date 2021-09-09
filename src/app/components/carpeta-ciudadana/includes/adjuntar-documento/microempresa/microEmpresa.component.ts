import { Component, Input, OnInit } from '@angular/core';
import { FileModel } from 'src/app/models/file.model';
import { deleteDocument, saveDocument } from '../AppUtils.component';

@Component({
    selector: 'app-micro-empresa',
    templateUrl: './microEmpresa.component.html'
})
export class MicroEmpresaComponent implements OnInit {
    @Input() fileListMi: FileModel[] = [];
    @Input() validate: boolean;
    public beneficial_ownership_micro: boolean = true;
    public society_constitution_micro: boolean = true;
    public legal_representative_micro: boolean = true;
    public annual_accounts_micro: boolean = true;
    public _commercial_code_micro: boolean = true;
    public tax_returns_micro: boolean = true;
    public model_390_micro: boolean = true;
    public model_347_micro: boolean = true;
    public registered_office_micro: boolean = true;
    public PYME_micro: boolean = true;
    public business_group_micro: boolean = true;

    constructor() { }

    ngOnInit(): void { }
    saveDocument(ev) {
        this[ev.controlName] = false;
        saveDocument(this.fileListMi, ev);
      }
    
      deleteDocument(ev) {
        this[ev.controlName] = true;
        deleteDocument(this.fileListMi, ev);
      }
}
