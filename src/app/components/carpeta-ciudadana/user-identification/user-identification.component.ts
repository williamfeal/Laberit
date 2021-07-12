import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-identification',
  templateUrl: './user-identification.component.html',
  styleUrls: ['./user-identification.component.scss']
})
export class UserIdentificationComponent implements OnInit {

  public interesado:boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  public isInteresado(): boolean {
    return false;
  }

  public isRepresentativeEmpresa(): boolean {
    return false;
  }

  public isRepresentativeAutonomo(): boolean {
    return true;
  }

  public isUserAutonomo(): boolean {
    return false;
  }

}
