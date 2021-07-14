import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
    private activatedRoute:ActivatedRoute,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.idProcedure = this.activatedRoute.snapshot.queryParams.idProcedure;
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

  public goToRequestInfo() {
    console.log(this.idProcedure)
    switch(this.idProcedure) {
      case "8e69e3dd-638b-4a0b-84b5-84b81b572304": 
        this.router.navigate(['carpeta-del-ciudadano/general-instance']);
        break;
      default: 
        this.router.navigate(['carpeta-del-ciudadano/request-info'], {
          queryParams: {
            idProcedure: this.idProcedure
          }
        });
    }
    
  }

}
