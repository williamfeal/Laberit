import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Procedure } from 'src/app/models/procedure.model';
import { ProceduresService } from 'src/app/services/moges-services/procedures.service';
import { tipoProyecto } from 'src/app/utils/constants/app-constants';
import { UrlConstants } from 'src/app/utils/constants/url-constants';
import { SwalUtils } from 'src/app/utils/swal-utils';

@Component({
    selector: 'linea-resistir',
    templateUrl: 'linea-resistir.component.html',
    styleUrls: ['./linea-resistir.component.scss']
})

export class LineaResistirComponent implements OnInit {


    public formLineaResistir: FormGroup;
    public procedure:Procedure;
    
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
        private procedureService:ProceduresService,
        private translate:TranslateService
    ) {

    }

    ngOnInit() {
        this.newForm();
        this.procedureService.getProcedureById(sessionStorage.getItem('idProcedure')).subscribe(
            data => this.procedure = data
          )
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
        if (this.formLineaResistir.valid) {
            //TO DO: Llamada al back con los datos 
            this.router.navigate([UrlConstants.VIEW_ADJUNTAR]);
        } else {
            this.translate.get('error_texts.pop_up.form_error').subscribe(
                error => {
                    SwalUtils.showErrorAlert(
                        error.title, 
                        error.text)
                    this.validate = true;
                }
            )
           
        }
    }
}