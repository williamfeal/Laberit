import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { SwalUtils } from 'src/app/utils/swal-utils';

@Component({
  selector: 'app-aceptation',
  templateUrl: './aceptation.component.html',
  styleUrls: ['./aceptation.component.scss']
})
export class AceptationComponent implements OnInit {

  public formAceptation:FormGroup;
  public validate:boolean = false;
  constructor(
    private router:Router,
    private translate:TranslateService
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
      check_1: new FormControl(false, Validators.required),
      check_2: new FormControl(false, Validators.required),
      check_3: new FormControl(false, Validators.required),
      check_4: new FormControl(false, Validators.required),
      check_5: new FormControl(false, Validators.required),

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
      this.translate.get('error_texts.pop_up.form_error').subscribe(
        error => {
            SwalUtils.showErrorAlert(
                error.title, 
                error.text);
            this.validate = true;
        }
    )

    }

  }
}
