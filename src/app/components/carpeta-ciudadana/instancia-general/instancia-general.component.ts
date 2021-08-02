import { ChangeDetectorRef, Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Tercero } from 'src/app/models/tercero.model';
import { CarpetaService } from 'src/app/services/trex-service/carpeta.service';

@Component({
  selector: 'app-instancia-general',
  templateUrl: './instancia-general.component.html',
  styleUrls: ['./instancia-general.component.scss']
})
export class InstanciaGeneralComponent implements OnInit {

  public user: Tercero;
  public formInstanciaGeneral: FormGroup;
  @Input() readOnly: boolean;
  @Input() errorTextRes: string = 'empty_error';
  @Input() errorNumRes: string = 'format_error';
  errorCharacterLeng: string = 'num_Characters_error';
  validators = [Validators.required];
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
      (data: Tercero) => {
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
    console.log(this.formInstanciaGeneral.valid);
    if (this.formInstanciaGeneral.valid) {
      console.log(this.formInstanciaGeneral);
      //this.router.navigate(['carpeta-del-ciudadano/adjuntar']);
    } else {
      console.log(this.formInstanciaGeneral);
      
     }
  }
}
