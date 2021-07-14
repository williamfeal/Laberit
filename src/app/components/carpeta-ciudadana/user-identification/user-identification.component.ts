import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CarpetaService } from 'src/app/services/trex-service/carpeta.service';

@Component({
  selector: 'app-user-identification',
  templateUrl: './user-identification.component.html',
  styleUrls: ['./user-identification.component.scss']
})
export class UserIdentificationComponent implements OnInit {

  public interesado:boolean = false;
  public user;
  public idProcedure;
  constructor(
    private activatedRoute:ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.idProcedure = this.activatedRoute.snapshot.params.idProcedure;
  }

  public isInteresado(): boolean {
    return true;
  }

  public isRepresentativeEmpresa(): boolean {
    return false;
  }

  public isRepresentativeAutonomo(): boolean {
    return false;
  }

  public isUserAutonomo(): boolean {
    return false;
  }

}
