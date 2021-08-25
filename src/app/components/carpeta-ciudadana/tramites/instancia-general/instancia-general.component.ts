import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Procedure } from 'src/app/models/procedure.model';
import { UserCertificado } from 'src/app/models/user-certificate.model';
import { ProceduresService } from 'src/app/services/moges-services/procedures.service';
import { CarpetaService } from 'src/app/services/trex-service/carpeta.service';

@Component({
  selector: 'app-instancia-general',
  templateUrl: './instancia-general.component.html',
  styleUrls: ['./instancia-general.component.scss']
})
export class InstanciaGeneralComponent {

  public user:UserCertificado;
  public formInstanciaGeneral: FormGroup;
  public procedure:Procedure;

  @Input() readOnly: boolean;
  @Input() errorTextRes: string = 'empty_error';
  @Input() errorNumRes: string = 'format_error';

  errorCharacterLeng: string = 'num_Characters_error';
  validators = [Validators.required];
  validate: boolean = false;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private procedureService:ProceduresService,
    private carpetaService: CarpetaService,
    private ref: ChangeDetectorRef,
  ) {

  }

  ngOnChanges() {
    this.ref.detectChanges();
  }

  ngOnInit(): void {
    this.procedureService.getProcedureById(sessionStorage.getItem('idProcedure')).subscribe(
      data => this.procedure = data
    )
    this.carpetaService.getLoggedUser().subscribe(
      (data: UserCertificado) => {
        this.user = data;
      }
    );
    this.newForm();
  }
  newForm() {
    this.formInstanciaGeneral = new FormGroup({
      formdDatosInteresado: new FormGroup({}),
      formDatosNotificacion: new FormGroup({})
    });
  }

  public goToDocumentation() {
    if (this.formInstanciaGeneral.valid) {
      this.validate = false;
      this.router.navigate(['carpeta-del-ciudadano/adjuntar']);
    } else {
      this.validate = true;
      console.log(this.formInstanciaGeneral);
    }
  }
}
