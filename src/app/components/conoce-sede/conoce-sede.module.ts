import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { ConoceLaSedeComponent } from './conoce-la-sede.component';
import { HeaderKnowSedeComponent } from './header/header-know-sede.component';
import { ConoceSedeRoutingModule } from './conoce-sede-routing.module';



@NgModule({
  declarations: [
    ConoceLaSedeComponent,
    HeaderKnowSedeComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ConoceSedeRoutingModule,
    TranslateModule
  ]
})
export class ConcoceSedeModule { }
