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
    return false;
  }

  public isRepresentative(): boolean {
    return true;
  }

  public isUserAutonomo(): boolean {
    return false;
  }

  public goToRequestInfo() {
        this.router.navigate(['carpeta-del-ciudadano/instancia-general'], {
          state: {
            data: {
              holi:'holi'
            }
          }
    });
  }

}
