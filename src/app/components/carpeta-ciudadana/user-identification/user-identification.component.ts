import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user-identification',
  templateUrl: './user-identification.component.html',
  styleUrls: ['./user-identification.component.scss']
})
export class UserIdentificationComponent implements OnInit {

  public requesterType = 'interested';

  public user;
  public idProcedure:string;
  public formUserIdentification:FormGroup;
  public showErrors = false;
  public readOnly:boolean;

  constructor(
    private activatedRoute:ActivatedRoute,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.idProcedure = this.activatedRoute.snapshot.queryParams.idProcedure;
    this.formUserIdentification = new FormGroup({
      identity_data: new FormGroup({ }),
      notification_means: new FormGroup({ }),
      actuation_data: new FormGroup({ }),
      interested_data: new FormGroup({ }),
      productive_establishment: new FormGroup({ }),
      representative_data: new FormGroup({ }),
      legal_representative: new FormGroup({}),
      contact_data: new FormGroup({})
    });
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
    if(this.formUserIdentification.valid) {
      this.router.navigate(['carpeta-del-ciudadano/instancia-general'], {
        state: {
          data: {
            holi:'holi'
          }
        }
      });
    } else {
      this.showErrors = true;
    }

    
  }

}
