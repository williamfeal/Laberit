import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from 'src/app/shared/shared.module';
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
  
})
export class ContractorProfileModule { }
