import { ChangeDetectorRef, Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Tercero } from 'src/app/models/tercero.model';
import { UserCertificado } from 'src/app/models/user-certificate.model';
import { CarpetaService } from 'src/app/services/trex-service/carpeta.service';

@Component({
  selector: 'app-instancia-general',
  templateUrl: './instancia-general.component.html',
  styleUrls: ['./instancia-general.component.scss']
})
export class InstanciaGeneralComponent {

  public user:UserCertificado;
  public formInstanciaGeneral: FormGroup;
  @Input() readOnly: boolean;
  @Input() errorTextRes: string = 'empty_error';
  @Input() errorNumRes: string = 'format_error';
  errorCharacterLeng: string = 'num_Characters_error';
  validators = [Validators.required];
  validate: boolean = false;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private carpetaService: CarpetaService,
    private ref: ChangeDetectorRef,
  ) {

  }
  ngOnChanges() {
    this.ref.detectChanges();
  }
  ngOnInit(): void {
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
  // get formDatosNotificacion(): FormGroup {
  //   return this.formInstanciaGeneral.get("formDatosNotificacion") as FormGroup;
  // }
  // get formdDatosInteresado(): FormGroup {
  //   return this.formInstanciaGeneral.get("formdDatosInteresado") as FormGroup;
  // }
  public goToDocumentation() {
    if (this.formInstanciaGeneral.valid) {
      console.log(this.formInstanciaGeneral);
      this.validate = false;
      //this.router.navigate(['carpeta-del-ciudadano/adjuntar']);
    } else {
      this.validate = true;
      console.log(this.formInstanciaGeneral);
      // this.validationContinue(this.formDatosNotificacion);
      // this.validationContinue(this.formdDatosInteresado);
      // this.validationContinue(this.formInstanciaGeneral);
    }
  }
  public validationContinue(form: FormGroup){
    Object.keys(form.controls).forEach(control => {
      const controlErrors: ValidationErrors = form.get(control).errors;
      if (controlErrors != null) {
            Object.keys(controlErrors).forEach(keyError => {
              console.log('Key control: ' + control + ', keyError: ' + keyError + ', err value: ', controlErrors[keyError]);
            });
          }
    })
   }
}
