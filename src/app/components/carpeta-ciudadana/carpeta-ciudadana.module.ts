import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CarpetaCiudadanaComponent } from './carpeta-ciudadana.component';
import { CarpetaService } from 'src/app/services/trex-service/carpeta.service';
import { AdjuntarDocComponent } from './includes/adjuntar-documento/adjuntar-doc.component';
import { ConfirmacionSolicitudComponent } from './includes/confirmacion-solicitud/confirmacion-solicitud.componenet';
import { DateComponent } from './includes/date-component/date.component';
import { DatosInteresadoComponent } from './includes/datos-interesado/datos-interesado.component';
import { DatosNotificacionComponent } from './includes/datos-notificacion/datos-notificacion.component';
import { PresentarSolicitudComponent } from './includes/presentar-solicitud/presentar-solicitud.component';
import { RequestsListComponent } from './requests-list/requests-list.component';
import { RequestInfoComponent } from './request-info/request-info.component';
import { InstanciaGeneralComponent } from './tramites/instancia-general/instancia-general.component';
import { LineaResistirComponent } from './tramites/linea-resistir/linea-resistir.component';
import { DetailCostFinancedComponent } from './tramites/linea-resistir/detail-cost-financed/detail-cost-financed.component';
import { ProcedureInformationComponent } from './tramites/linea-resistir/procedure-information/procedure-information.component';
import { UserIdentificationComponent } from './user-identification/user-identification.component';
import { ActuationDataComponent } from './user-identification/actuation-data/actuation-data.component';
import { ContactDataComponent } from './user-identification/contact-data/contact-data.component';
import { IdentityDataComponent } from './user-identification/identity-data/identity-data.component';
import { InterestedDataComponent } from './user-identification/interested-data/interested-data.component';
import { LegalRepresentativeComponent } from './user-identification/legal-representative/legal-representative.component';
import { NotificationMeansComponent } from './user-identification/notification-means/notification-means.component';
import { ProductiveEstablishmentAddressComponent } from './user-identification/productive-establishment-address/productive-establishment-address.component';
import { RepresentativeDataComponent } from './user-identification/representative-data/representative-data.component';
import { RequesterDataComponent } from './user-identification/requester-data/requester-data.component';
import { SocialAddressComponent } from './user-identification/social-address/social-address.component';
import { CarpetaCiudadanaRoutingModule } from './carpeta-ciudadana-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FirmarYPresentarPopUp } from './includes/firmarYpresentarPopUp/firmarYpresentarPopUp.component';



@NgModule({
  declarations: [
    CarpetaCiudadanaComponent,
    AdjuntarDocComponent,
    ConfirmacionSolicitudComponent,
    DateComponent,
    DatosInteresadoComponent,
    DatosNotificacionComponent,
    PresentarSolicitudComponent,
    RequestsListComponent,
    RequestInfoComponent,
    InstanciaGeneralComponent,
    LineaResistirComponent,
    DetailCostFinancedComponent,
    ProcedureInformationComponent,
    UserIdentificationComponent,
    ActuationDataComponent,
    ContactDataComponent,
    IdentityDataComponent,
    InterestedDataComponent,
    LegalRepresentativeComponent,
    NotificationMeansComponent,
    ProductiveEstablishmentAddressComponent,
    RepresentativeDataComponent,
    RequesterDataComponent,
    SocialAddressComponent,
    FirmarYPresentarPopUp
  ],
  imports: [
    CommonModule,
    SharedModule,
    CarpetaCiudadanaRoutingModule,
    TranslateModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
  ],
  providers: [
    CarpetaService
  ]
})
export class CarpetaCiudadanaModule { }
