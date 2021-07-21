import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Procedure } from 'src/app/models/procedure.model';
import { ProceduresService } from 'src/app/services/moges-services/procedures.service';

@Component({
  selector: 'app-user-identification',
  templateUrl: './user-identification.component.html',
  styleUrls: ['./user-identification.component.scss']
})
export class UserIdentificationComponent implements OnInit {

  public requesterType = 'interested';

  public user;
  public idProcedure;

  constructor(
    private activatedRoute:ActivatedRoute,
    private proceduresService: ProceduresService,
    private router:Router,
  ) { }

  ngOnInit(): void {
    this.idProcedure = this.activatedRoute.snapshot.queryParams.idProcedure;
    this.proceduresService.getAllProcedure().subscribe(
      (procedures: Procedure[]) => {
       let procedure = procedures.find(element => element.id == this.idProcedure);
       console.log('procedure :>> ', procedure);
      })
  }

  public isInteresado(): boolean {
    return this.requesterType === 'interested';
  }

  public isRepresentative(): boolean {
    return this.requesterType === 'representative';
  }

  public isUserAutonomo(): boolean {
    return false;
  }

  onChangeTypeRequester(event) {
    this.requesterType = event;
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
