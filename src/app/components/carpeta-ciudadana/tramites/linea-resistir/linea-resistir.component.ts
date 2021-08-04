import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { lineaResistir } from 'src/app/utils/constants/app-constants';

@Component({
    selector: 'linea-resistir',
    templateUrl: 'linea-resistir.component.html',
    styleUrls: ['./linea-resistir.component.scss']
})

export class LineaResistirComponent implements OnInit {


    public formLineaResistir: FormGroup;
    validators = [Validators.required];
    campos = lineaResistir;
    constructor(
        private fb: FormBuilder,
        private router: Router,
        private ref: ChangeDetectorRef,
    ) {

    }

    ngOnInit() {
        this.newForm();
        console.log('this.campos :>> ', this.campos);
    }

    ngOnChanges() {
        this.ref.detectChanges();
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