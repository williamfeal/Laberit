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
      manifestation_1 : new FormControl('', Validators.required),
      manifestation_2 : new FormControl('', Validators.required),
      manifestation_3 : new FormControl('', Validators.required),
      manifestation_4 : new FormControl('', Validators.required),
      manifestation_5 : new FormControl('', Validators.required),
      manifestation_6 : new FormControl('', Validators.required),
      manifestation_7 : new FormControl('', Validators.required),
      manifestation_8 : new FormControl('', Validators.required),
      manifestation_9 : new FormControl('', Validators.required),
      manifestation_10 : new FormControl('', Validators.required),
      check_1: new FormControl(false, Validators.required),
      check_2: new FormControl(false, Validators.required),
      check_3: new FormControl(false, Validators.required),
      check_4: new FormControl(false, Validators.required),
      check_5: new FormControl(false, Validators.required),

    })
  }

  public validateForm() {
    if(this.formAceptation.valid) {
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
