import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Procedure } from 'src/app/models/procedure.model';
import { ProceduresService } from 'src/app/services/moges-services/procedures.service';
import { SwalUtils } from 'src/app/utils/swal-utils';

@Component({
  selector: 'app-aceptation',
  templateUrl: './aceptation.component.html',
  styleUrls: ['./aceptation.component.scss']
})
export class AceptationComponent implements OnInit {

  public formAceptation:FormGroup;
  public validate:boolean = false;
  public procedure:Procedure;
  constructor(
    private router:Router,
    private translate:TranslateService,
    private proceduresService:ProceduresService
  ) { }

  ngOnInit(): void {
    const idProcedure = sessionStorage.getItem('idProcedure');
    this.proceduresService.getProcedureById(idProcedure).subscribe(
      data => this.procedure = data
    )
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
      check_1: new FormControl('', Validators.requiredTrue),
      check_2: new FormControl('', Validators.requiredTrue),
      check_3: new FormControl('', Validators.requiredTrue),
      check_4: new FormControl('', Validators.requiredTrue),
      check_5: new FormControl('', Validators.requiredTrue),

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
