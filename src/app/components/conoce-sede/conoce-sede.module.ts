import { CommonModule } from '@angular/common';
import { ConoceLaSedeComponent } from './conoce-la-sede.component';
import { ConoceSedeRoutingModule } from './conoce-sede-routing.module';
import { HeaderKnowSedeComponent } from './header/header-know-sede.component';
import { LanguagesService } from 'src/app/services/moges-services/language.service';
import { LOCALE_ID, NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';



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
