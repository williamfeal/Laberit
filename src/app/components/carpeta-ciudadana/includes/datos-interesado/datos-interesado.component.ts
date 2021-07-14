import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-datos-interesado',
  templateUrl: './datos-interesado.component.html',
  styleUrls: ['./datos-interesado.component.scss']
})
export class DatosInteresadoComponent implements OnInit {
  
  constructor() { }

  ngOnInit(): void {
  }
isInteresado(): boolean{
  return false;
}
}
