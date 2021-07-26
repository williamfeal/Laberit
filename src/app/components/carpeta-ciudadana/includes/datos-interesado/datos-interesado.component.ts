import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Tercero } from 'src/app/models/tercero.model';

@Component({
  selector: 'app-datos-interesado',
  templateUrl: './datos-interesado.component.html',
  styleUrls: ['./datos-interesado.component.scss']
})
export class DatosInteresadoComponent implements OnInit {
  
  @Input() user:Tercero;
  @Input() readOnly:boolean;
  @Input() formInstanciaGeneral:FormGroup;

  constructor() { }

  ngOnInit(): void {
  }
  
  isInteresado(): boolean{
    return false;
  }
}
