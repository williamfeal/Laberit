import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { ProceduresService } from 'src/app/services/moges-services/procedures.service';
import { ValideComponent } from './valide/valide.component';
import { ElectronicInvoiceComponent } from './electronic-invoice/electronic-invoice.component';
import { DocumentVerificationComponent } from './document-verification/document-verification.component';
import { ElectronicServicesRoutingModule } from './electronic-services-routing.module';
import { NotificationsComponent } from './notifications/notifications.component';
import { NgxCaptchaModule } from 'ngx-captcha';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    NotificationsComponent,
    ValideComponent,
    ElectronicInvoiceComponent,
    DocumentVerificationComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    ElectronicServicesRoutingModule,
    TranslateModule,
    NgxCaptchaModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [TranslateService]
})
export class ElectronicServicesModule { }
