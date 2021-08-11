import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { tipoInteres } from 'src/app/utils/constants/app-constants';

@Component({
    selector: 'app-procedure-information',
    templateUrl: 'procedure-information.component.html'
})

export class ProcedureInformationComponent implements OnInit {

    @Input() formLineaResistir: FormGroup;
    @Input() validate: boolean;
    //se bebera de los catalogos
    tipoInteres = tipoInteres;
    
    constructor() { }

    ngOnInit() { 
    }

}