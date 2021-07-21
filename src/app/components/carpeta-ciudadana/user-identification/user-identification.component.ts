import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
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
      identity_data: new FormGroup({
        name_and_surname: new FormControl('', Validators.required),
        nif: new FormControl('', Validators.required)
      })
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
      console.log(this.formUserIdentification.controls)
    }

    
  }

}
