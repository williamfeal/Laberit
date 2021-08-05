import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { tipoProyecto } from 'src/app/utils/constants/app-constants';

@Component({
    selector: 'linea-resistir',
    templateUrl: 'linea-resistir.component.html',
    styleUrls: ['./linea-resistir.component.scss']
})

export class LineaResistirComponent implements OnInit {


    public formLineaResistir: FormGroup;
    validators = [Validators.required];

    showInversion = false;
    showCirculante = false;

    //se bebera de los catalogos
    tipoProyecto = tipoProyecto;
    company_type: string;
    constructor(
        private fb: FormBuilder,
        private router: Router,
        private ref: ChangeDetectorRef,
    ) {

    }

    ngOnInit() {
        this.newForm();
    }

    ngOnChanges() {
        this.ref.detectChanges();
    }
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
    newForm() {
        this.formLineaResistir = new FormGroup({
            formdDatosInteresado: new FormGroup({}),
            formDatosNotificacion: new FormGroup({})
        });
    }
    public goToDocumentation() {
        console.log(this.formLineaResistir.valid);
        if (this.formLineaResistir.valid) {
            this.router.navigate(['carpeta-del-ciudadano/adjuntar']);
        } else {
            console.log(this.formLineaResistir);

        }
    }
}