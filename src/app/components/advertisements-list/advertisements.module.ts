import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdvertisementsListComponent } from './advertisements-list.component';
import { AdvertisementDetailComponent } from './advertisement-detail/advertisement-detail.component';
import { AdvertisementsService } from 'src/app/services/moges-services/advertisements.service';
import { AdvertisementsRoutingModule } from './advertisements-routing.module';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';



@NgModule({
  declarations: [
    AdvertisementsListComponent,
    AdvertisementDetailComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    AdvertisementsRoutingModule,
    TranslateModule,
    NgbModule,
  ],
  providers: [
    AdvertisementsService
  ]
})
export class AdvertisementsModule { }
