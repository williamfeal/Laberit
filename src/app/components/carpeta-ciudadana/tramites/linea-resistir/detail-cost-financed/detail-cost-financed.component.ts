import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { tipoProyecto } from 'src/app/utils/constants/app-constants';

@Component({
    selector: 'app-detail-cost-financed',
    templateUrl: 'detail-cost-financed.component.html'
})

export class DetailCostFinancedComponent implements OnInit {

    @Input() formLineaResistir: FormGroup;
    @Input() validate: boolean;

    //se bebera de los catalogos
    tipoProyecto = tipoProyecto;

    showInversion = false;
    showCirculante = false;
    
    company_type: string;

    constructor(
        private ref: ChangeDetectorRef
    ) { }

    ngOnChanges() {
        this.ref.detectChanges();
    }

    ngOnInit() { }

    capturarCampo(ev, campo) {
        this[campo] = ev.target.value;
        if (campo == 'company_type') {
            switch (this.company_type) {
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
        }
    }

}