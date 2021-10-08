import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Draft } from 'src/app/models/draft.model';
import { Procedure } from 'src/app/models/procedure.model';
import { ProceduresService } from 'src/app/services/moges-services/procedures.service';
import { CarpetaService } from 'src/app/services/trex-service/carpeta.service';
import { tipoProyecto } from 'src/app/utils/constants/app-constants';
import { UrlConstants } from 'src/app/utils/constants/url-constants';
import { SwalUtils } from 'src/app/utils/swal-utils';

@Component({
    selector: 'linea-resistir',
    templateUrl: 'linea-resistir.component.html',
    styleUrls: ['./linea-resistir.component.scss']
})

export class LineaResistirComponent implements OnInit {

    public draft:Draft;
    public formLineaResistir: FormGroup;
    public procedure:Procedure;
    
    showInversion = false;
    showCirculante = false;

    validate: boolean = false;

    private unsubscribe$ = new Subject<void>();

    //se bebera de los catalogos
    tipoProyecto = tipoProyecto;
    company_type: string;
    constructor(
        private activatedRoute:ActivatedRoute,
        private router: Router,
        private ref: ChangeDetectorRef,
        private procedureService:ProceduresService,
        private translate:TranslateService,
        private carpetaService:CarpetaService
    ) {

    }

    ngOnInit() {
        this.getDraft();
        this.newForm();
        this.procedureService.getProcedureById(sessionStorage.getItem('idProcedure')).pipe(
            takeUntil(this.unsubscribe$)
        ).subscribe(
            data => this.procedure = data
          )
    }

    ngOnChanges() {
        this.ref.detectChanges();
    }

    private getDraft() {
        if(this.activatedRoute.snapshot.queryParams.draft){
            this.carpetaService.getDraftById(this.activatedRoute.snapshot.queryParams.draft).subscribe(
                data => { this.draft = data;
                        console.log(this.draft) }
            )
        }
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
            this.saveDraftAndNavigate();
        } else {
            this.translate.get('error_texts.pop_up.form_error').pipe(
                takeUntil(this.unsubscribe$)
            ).subscribe(
                error => {
                    SwalUtils.showErrorAlert(
                        error.title, 
                        error.text)
                    this.validate = true;
                }
            )
           
        }
    }

    private saveDraftAndNavigate() {
        if(this.draft) {
            const infoJSON = JSON.parse(this.draft.info);
            infoJSON.formLineaResistir = this.formLineaResistir.value;
    
            this.draft.info = JSON.stringify(infoJSON);
            this.carpetaService.saveDraft(this.draft).subscribe(
                () => this.router.navigate([UrlConstants.VIEW_ADJUNTAR], { queryParams: { draft: this.draft.key }})
            )
        } else {
            this.router.navigate([UrlConstants.VIEW_ADJUNTAR]);
        }     
    }


    ngOnDestroy(): void {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }
}