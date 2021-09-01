import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HomeComponent } from './home.component';
import { SliderHomeComponent } from './slider-home/slider-home.component';
import { ProceduresHomeComponent } from './procedures-home/procedures-home.component';
import { HomeRoutingModule } from './home-routing.module';
import { ProceduresService } from 'src/app/services/moges-services/procedures.service';



@NgModule({
  declarations: [
    HomeComponent,
    SliderHomeComponent,
    ProceduresHomeComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    HomeRoutingModule,
    TranslateModule,
    NgbModule,
  ],
  providers: [
    ProceduresService
  ]
})
export class HomeModule { }
