import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { tipoProyecto } from 'src/app/utils/constants/app-constants';
import { UrlConstants } from 'src/app/utils/constants/url-constants';

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

    validate: boolean = false;

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

    newForm() {
        this.formLineaResistir = new FormGroup({
            formdDatosInteresado: new FormGroup({}),
            formDatosNotificacion: new FormGroup({})
        });
    }
    public goToDocumentation() {
        console.log(this.formLineaResistir.valid);
        if (this.formLineaResistir.valid) {
            //TO DO: Llamada al back con los datos 
            this.router.navigate([UrlConstants.VIEW_ADJUNTAR]);
        } else {
            console.log(this.formLineaResistir);
            this.validate = true;
        }
    }
}