import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { isEmptyObject } from 'jquery';
import { Draft } from 'src/app/models/draft.model';
import { tipoInteres } from 'src/app/utils/constants/app-constants';

@Component({
    selector: 'app-procedure-information',
    templateUrl: 'procedure-information.component.html'
})

export class ProcedureInformationComponent implements OnInit, OnChanges {

    @Input() formLineaResistir: FormGroup;
    @Input() validate: boolean;
    @Input() draft:Draft;

    //se bebera de los catalogos
    tipoInteres = tipoInteres;
    
    public draftProcedureInformation;
    constructor() { }

    ngOnInit() { 
    }

    ngOnChanges(changes:SimpleChanges) {
        if(changes.draft && !isEmptyObject(this.draft) && JSON.parse(this.draft.info).formLineaResistir) {
            this.draftProcedureInformation = JSON.parse(this.draft.info).formLineaResistir;
        }
    }
}