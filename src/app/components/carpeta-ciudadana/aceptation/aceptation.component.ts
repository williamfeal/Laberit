import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-aceptation',
  templateUrl: './aceptation.component.html',
  styleUrls: ['./aceptation.component.scss']
})
export class AceptationComponent implements OnInit {

  public formAceptation:FormGroup;

  constructor(
    private router:Router
  ) { }

  ngOnInit(): void {
    this.formAceptation = new FormGroup({
      manifestation_1 : new FormControl('false'),
      manifestation_2 : new FormControl('false'),
      manifestation_3 : new FormControl('false'),
      manifestation_4 : new FormControl('false'),
      manifestation_5 : new FormControl('false'),
      manifestation_6 : new FormControl('false'),
      manifestation_7 : new FormControl('false'),
      manifestation_8 : new FormControl('false'),
      manifestation_9 : new FormControl('false'),
      manifestation_10 : new FormControl('false'),
      check_1: new FormControl(),
      check_2: new FormControl(),
      check_3: new FormControl(),
      check_4: new FormControl(),
      check_5: new FormControl(),

    })
  }

  public validateForm() {
    if(this.formAceptation.controls.check_1.value && 
      this.formAceptation.controls.check_2.value && 
      this.formAceptation.controls.check_3.value && 
      this.formAceptation.controls.check_4.value && 
      this.formAceptation.controls.check_5.value) {
        this.router.navigate(['carpeta-del-ciudadano/firmar'])
    } else {
      
    }

  }
}
