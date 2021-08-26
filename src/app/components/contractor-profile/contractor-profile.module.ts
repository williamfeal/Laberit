import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { ProceduresService } from 'src/app/services/moges-services/procedures.service';
import { NgxCaptchaModule } from 'ngx-captcha';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ContractorProfileComponent } from './contractor-profile.component';
import { ContractorProfileRoutingModule } from './contractor-profile-routing.module';



@NgModule({
  declarations: [
    ContractorProfileComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ContractorProfileRoutingModule,
    TranslateModule
  ],
  providers: [
    ProceduresService
  ]
})
export class ContractorProfileModule { }
