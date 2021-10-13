import {
    AfterViewChecked,
    ChangeDetectorRef,
    Component,
    Input,
    OnInit,
    SimpleChanges
    } from '@angular/core';
import { Draft } from 'src/app/models/draft.model';
import { FormGroup } from '@angular/forms';
import { isEmptyObject } from 'jquery';
import { tipoProyecto } from 'src/app/utils/constants/app-constants';

@Component({
    selector: 'app-detail-cost-financed',
    templateUrl: 'detail-cost-financed.component.html'
})

export class DetailCostFinancedComponent implements OnInit {

    @Input() formLineaResistir: FormGroup;
    @Input() validate: boolean;
    @Input() draft:Draft;
    //se bebera de los catalogos
    tipoProyecto = tipoProyecto;

    showInversion = false;
    showCirculante = false;
    
    project_type: string;

    public draftDetailCostFinanced;

    constructor(
        private ref: ChangeDetectorRef
    ) { }

    ngOnChanges(changes:SimpleChanges) {
        if(changes.draft && !isEmptyObject(this.draft) && JSON.parse(this.draft.info).formLineaResistir) {
            this.draftDetailCostFinanced = JSON.parse(this.draft.info).formLineaResistir;
            if(!isEmptyObject(this.draftDetailCostFinanced.project_type)) {
                this.capturarCampo(this.draftDetailCostFinanced.project_type, 'project_type');
            }
        }
        this.ref.detectChanges();

    }

    ngOnInit() { }

    capturarCampo(ev, campo) {
        this[campo] = ev;
        if (campo == 'project_type') {
            switch (this.project_type) {
                case '1':
                    this.showInversion = true;
                    this.showCirculante = false;
                    break;
                case '2':
                    this.showInversion = false;
                    this.showCirculante = true;
                    break;
                case '3':
                    this.showInversion = true;
                    this.showCirculante = true;
                    break;
                default:
                    break;
            }
            this.ref.detectChanges();
        }
    }

}