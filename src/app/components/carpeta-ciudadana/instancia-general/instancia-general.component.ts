import { ChangeDetectorRef, Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
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

  public user: UserCertificado;
  public formInstanciaGeneral: FormGroup;
  @Input() readOnly: boolean;
  @Input() errorTextRes: string = 'empty_error';
  @Input() errorNumRes: string = 'format_error';
  errorCharacterLeng: string = 'num_Characters_error';
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
    //TO DO: pasar el token del usuario a la espera de saber donde de obtenerlo y guardarlo
    this.carpetaService.getLoggedUser('a').subscribe(
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
    console.log(this.formInstanciaGeneral.controls.resum.value.length);
    if (this.formInstanciaGeneral.valid) {
      this.router.navigate(['carpeta-del-ciudadano/adjuntar']);
    } else {
      if (this.formInstanciaGeneral.value.formDatosNotificacion.typeStreet === 0) {
        this.errors[0] = true;
      } else {
        this.errors[0] = false;
      }
      if (this.formInstanciaGeneral.value.formDatosNotificacion.direction === '') {
        this.errors[1] = true;
      } else {
        this.errors[1] = false;
      }
      if (this.formInstanciaGeneral.value.formDatosNotificacion.number === '') {
        this.errors[2] = true;
      } else {
        this.errors[2] = false;
      }
      if (Number(this.formInstanciaGeneral.value.formDatosNotificacion.number)) {
        this.errorNum[0] = false;
      } else {
        this.errorNum[0] = true;
      }
      if (this.formInstanciaGeneral.value.formDatosNotificacion.extra === '') {
        this.errors[3] = true;
      } else {
        this.errors[3] = false;
      }
      if (this.formInstanciaGeneral.value.formDatosNotificacion.CP === '') {
        this.errors[4] = true;
      } else {
        this.errors[4] = false;
      }
      if (Number(this.formInstanciaGeneral.value.formDatosNotificacion.CP)) {
        this.errorNum[1] = false;
      } else {
        this.errorNum[1] = true;
      }
      if (this.formInstanciaGeneral.value.formDatosNotificacion.country === 0) {
        this.errors[5] = true;
      } else {
        this.errors[5] = false;
      }
      if (this.formInstanciaGeneral.value.formDatosNotificacion.province === 0) {
        this.errors[6] = true;
      } else {
        this.errors[6] = false;
      }
      if (this.formInstanciaGeneral.value.formDatosNotificacion.municipality === 0) {
        this.errors[7] = true;
      } else {
        this.errors[7] = false;
      }
      if (this.formInstanciaGeneral.controls.resum.value === '') {
        this.errors[8] = true;
      } else {
        this.errors[8] = false;
        if (this.formInstanciaGeneral.controls.resum.value.length <= 11) {
          this.errors[8] = true;
        } else {
          this.errors[8] = false;
        }
      }

      if (this.formInstanciaGeneral.controls.expone.value === '') {
        this.errors[9] = true;
      } else {
        this.errors[9] = false;
        if (this.formInstanciaGeneral.controls.expone.value.length <= 11) {
          this.errors[9] = true;
        } else {
          this.errors[9] = false;
        }
      }
      if (this.formInstanciaGeneral.controls.request.value === '') {
        this.errors[10] = true;
      } else {
        this.errors[10] = false;
        if (this.formInstanciaGeneral.controls.request.value.length <= 11) {
          this.errors[10] = true;
        } else {
          this.errors[10] = false;
        }
      }

    }
  }
}
