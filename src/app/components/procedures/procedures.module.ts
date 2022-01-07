import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { ProceduresService } from 'src/app/services/moges-services/procedures.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProceduresSearchComponent } from './procedures-search/procedures-search.component';
import { ProcedureDetailComponent } from './procedure-detail/procedure-detail.component';
import { ProceduresComponent } from './procedures.component';
import { ProceduresRoutingModule } from './procedures-routing.module';



@NgModule({
  declarations: [
    ProceduresSearchComponent,
    ProcedureDetailComponent,
    ProceduresComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    ProceduresRoutingModule,
    TranslateModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    ProceduresService
  ]
})
export class ProceduresModule { }
