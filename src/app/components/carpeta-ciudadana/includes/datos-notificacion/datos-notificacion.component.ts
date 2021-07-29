import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { SelectFieldObject } from 'src/app/shared/form/fields/input-select/input-select';
import { provincias, comunidades, typeStreet,paises } from 'src/app/utils/constants/app-constants';
@Component({
  selector: 'app-datos-notificacion',
  templateUrl: './datos-notificacion.component.html',
  styleUrls: ['./datos-notificacion.component.scss']
})
export class DatosNotificacionComponent implements OnInit {
  @Input() readOnly:boolean;
  @Input() formDatosNotificacion:FormGroup;
  public typeStreet: SelectFieldObject[];
  public provincias: SelectFieldObject[];
  public municipios: SelectFieldObject[];
  public paises: SelectFieldObject[];
  @Input() errorTextRes: string = 'empty_error';
  @Input() errorNumRes: string = 'format_error';
  @Input() errors: boolean[] = [];
  @Input() errorNum: boolean [] = [];
  constructor() { }

  ngOnInit(): void {
    this.typeStreet = typeStreet;
    this.provincias = provincias;
    this.municipios = comunidades;
    this.paises     = paises;
  }
  catchResultInput(event: string, name: string){
    if(name === 'direction'){
      if(event === '' || event === 'undefined' || event === undefined || event === null){
        this.errors[1] = true;
      }else{
        this.errors[1] = false;
      }
    }
    if(name === 'number'){
      if(event === '' || event === 'undefined' || event === undefined || event === null){
        this.errors[2] = true;
      }else{
        this.errors[2] = false;
      }
    }
    if(name === 'extra'){
      if(event === '' || event === 'undefined' || event === undefined || event === null){
        this.errors[3] = true;
      }else{
        this.errors[3] = false;
      }
    }
    if(name === 'CP'){
      if(event === '' || event === 'undefined' || event === undefined || event === null){
        this.errors[4] = true;
      }else{
        this.errors[4] = false;
      }
    }
  }
}
