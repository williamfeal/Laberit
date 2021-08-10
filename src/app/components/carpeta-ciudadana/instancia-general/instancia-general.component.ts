import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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
  errors: boolean[] = [false, false, false, false, false, false, false, false, false, false, false, false];
  errorNum: boolean[] = [false, false];
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
  //Captura los cambios en los inputs para sacar si estan vacios
  catchResultInput(event: string, name: string) {
    if (name === 'resum') {
      if (event === '' || event === 'undefined' || event === undefined || event === null) {
        this.errors[8] = true;
      } else {
        this.errors[8] = false;
      }
    }
    if (name === 'expone') {
      if (event === '' || event === 'undefined' || event === undefined || event === null) {
        this.errors[9] = true;
      } else {
        this.errors[9] = false;
      }
    }
    if (name === 'request') {
      if (event === '' || event === 'undefined' || event === undefined || event === null) {
        this.errors[10] = true;
      } else {
        this.errors[10] = false;
      }
    }
  }
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
