import { AceptationComponent } from './aceptation/aceptation.component';
import { AdjuntarDocComponent } from './includes/adjuntar-documento/adjuntar-doc.component';
import { AutonomsComponent } from './includes/adjuntar-documento/autonoms/autonoms.component';
import { BrowserModule } from '@angular/platform-browser';
import { BussinesType } from './user-identification/representative-data/dialog-bussinesType/bussinesType.component';
import { CarpetaCiudadanaComponent } from './carpeta-ciudadana.component';
import { CarpetaCiudadanaRoutingModule } from './carpeta-ciudadana-routing.module';
import { CarpetaService } from 'src/app/services/acli-service/carpeta.service';
import { CatalogsService } from 'src/app/services/catalogs/catalogs.service';
import { CommonModule } from '@angular/common';
import { ComunidadBienesComponent } from './includes/adjuntar-documento/comunidadBienes/comunidad.component';
import { ConfirmacionSolicitudComponent } from './includes/confirmacion-solicitud/confirmacion-solicitud.component';
import { ContactDataComponent } from './user-identification/contact-data/contact-data.component';
import { DateComponent } from './includes/date-component/date.component';
import { DatosInteresadoComponent } from './includes/datos-interesado/datos-interesado.component';
import { DatosNotificacionComponent } from './includes/datos-notificacion/datos-notificacion.component';
import { DetailCostFinancedComponent } from './tramites/linea-resistir/detail-cost-financed/detail-cost-financed.component';
import { EdicionSolicitudComponent } from './requests-list/edicion-terceros/edicion-solicitud.component';
import { FirmarYPresentarPopUp } from './includes/firmarYpresentarPopUp/firmarYpresentarPopUp.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GranEmpresaComponent } from './includes/adjuntar-documento/granEmpresa/granEmpresa.component';
import { HttpClientModule } from '@angular/common/http';
import { IdentityDataComponent } from './user-identification/identity-data/identity-data.component';
import { InstanciaGeneralComponent } from './tramites/instancia-general/instancia-general.component';
import { InterestedDataComponent } from './user-identification/interested-data/interested-data.component';
import { LegalRepresentativeComponent } from './user-identification/legal-representative/legal-representative.component';
import { LineaResistirComponent } from './tramites/linea-resistir/linea-resistir.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTableModule } from '@angular/material/table';
import { MicroEmpresaComponent } from './includes/adjuntar-documento/microempresa/microEmpresa.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgModule } from '@angular/core';
import { NotificationMeansComponent } from './user-identification/notification-means/notification-means.component';
import { NotificationsListComponent } from './notifications/notifications-list/notifications-list.component';
import { NotificationViewComponent } from './notifications/notification-view/notification-view.component';
import { PoderRepresentacionComponent } from './user-identification/comprobar-poder-rep/poder-representacion.component';
import { PresentarSolicitudComponent } from './includes/presentar-solicitud/presentar-solicitud.component';
import { ProcedureInformationComponent } from './tramites/linea-resistir/procedure-information/procedure-information.component';
import { ProductiveEstablishmentAddressComponent } from './user-identification/productive-establishment-address/productive-establishment-address.component';
import { PymeComponent } from './includes/adjuntar-documento/PYME/PYME.component';
import { RepresentativeDataComponent } from './user-identification/representative-data/representative-data.component';
import { RequesterDataComponent } from './user-identification/requester-data/requester-data.component';
import { RequestsListComponent } from './requests-list/requests-list.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { SignNotificationReceiptComponent } from './notifications/sign-notification-receipt/sign-notification-receipt.component';
import { SocialAddressComponent } from './user-identification/social-address/social-address.component';
import { SociedadCivilComponent } from './includes/adjuntar-documento/sociedadCivil/sociedadCivil.component';
import { TranslateModule } from '@ngx-translate/core';
import { UserIdentificationComponent } from './user-identification/user-identification.component';
import { Aceptation } from './aceptation/dialog-aceptation/aceptation.component';



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
    InstanciaGeneralComponent,
    LineaResistirComponent,
    DetailCostFinancedComponent,
    ProcedureInformationComponent,
    UserIdentificationComponent,
    ContactDataComponent,
    IdentityDataComponent,
    InterestedDataComponent,
    LegalRepresentativeComponent,
    NotificationMeansComponent,
    ProductiveEstablishmentAddressComponent,
    RepresentativeDataComponent,
    RequesterDataComponent,
    SocialAddressComponent,
    AceptationComponent,
    FirmarYPresentarPopUp,
    AutonomsComponent,
    ComunidadBienesComponent,
    GranEmpresaComponent,
    MicroEmpresaComponent,
    PymeComponent,
    SociedadCivilComponent,
    NotificationsListComponent,
    NotificationViewComponent,
    SignNotificationReceiptComponent,
    PoderRepresentacionComponent,
    BussinesType,
    EdicionSolicitudComponent,
    Aceptation
  ],

  entryComponents: [BussinesType, Aceptation],

  imports: [
    CommonModule,
    SharedModule,
    CarpetaCiudadanaRoutingModule,
    TranslateModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    HttpClientModule,
    BrowserModule,
    MatTableModule,
    MatPaginatorModule,
    MatDialogModule,
    MatStepperModule
  ],
  providers: [
    CarpetaService,
    CatalogsService
  ]
})
export class CarpetaCiudadanaModule { }
