import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-instancia-general',
  templateUrl: './instancia-general.component.html',
  styleUrls: ['./instancia-general.component.scss']
})
export class InstanciaGeneralComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void { }

  public goToRequestInfo() {
    this.router.navigate(['carpeta-del-ciudadano/adjuntar']);
  }
}
