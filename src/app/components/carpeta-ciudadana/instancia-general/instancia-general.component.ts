import { ChangeDetectorRef, Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Tercero } from 'src/app/models/tercero.model';
import { CarpetaService } from 'src/app/services/trex-service/carpeta.service';

@Component({
  selector: 'app-instancia-general',
  templateUrl: './instancia-general.component.html',
  styleUrls: ['./instancia-general.component.scss']
})
export class InstanciaGeneralComponent implements OnInit {

  public user:Tercero;
  public formInstanciaGeneral:FormGroup;
  @Input() readOnly:boolean;
  @Input() errorTextRes: string = 'empty_error';
  errors: boolean[] = [false, false, false];
  constructor(
    private fb: FormBuilder,
    private router:Router,
    private carpetaService:CarpetaService,
    private ref: ChangeDetectorRef,
  ) {  
   
  }
  ngOnChanges() {
    this.ref.detectChanges();
  }
  ngOnInit(): void { 
    this.carpetaService.getLoggedUser().subscribe(
      (data:Tercero) => {
        this.user = data;
      }
    );
    this.newForm();
  }
  newForm(){
    this.formInstanciaGeneral = new FormGroup({
      formdDatosInteresado: new FormGroup({}),
      formDatosNotificacion: new FormGroup({})
    });
  }
  //Captura los cambios en los inputs para sacar si estan vacios
  catchResultInput(event: string, name: string){
      if(name === 'resum'){
        if(event === '' || event === 'undefined' || event === undefined || event === null){
          this.errors[0] = true;
        }else{
          this.errors[0] = false;
        }
      }
      if(name === 'expone'){
        if(event === '' || event === 'undefined' || event === undefined || event === null){
          this.errors[1] = true;
        }else{
          this.errors[1] = false;
        }
      }
      if(name === 'request'){
        if(event === '' || event === 'undefined' || event === undefined || event === null){
          this.errors[2] = true;
        }else{
          this.errors[2] = false;
        }
      }
  }
  public goToDocumentation() {
    if(this.formInstanciaGeneral.valid){
      this.router.navigate(['carpeta-del-ciudadano/adjuntar']);
    }else{
      if(this.formInstanciaGeneral.controls.resum.value === ''){
        this.errors[0] = true;
      }else{
        this.errors[0] = false;
      }
      if(this.formInstanciaGeneral.controls.expone.value === ''){
        this.errors[1] = true;
      }else{
        this.errors[1] = false;
      }
      if(this.formInstanciaGeneral.controls.request.value === ''){
        this.errors[2] = true;
      }else{
        this.errors[2] = false;
      }
    }
  }
}
