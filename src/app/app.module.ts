import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import localeEs from '@angular/common/locales/es-PY';

import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { registerLocaleData } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { NgxCaptchaModule } from 'ngx-captcha';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BreadcrumbModule} from 'angular-crumbs';

import { AdvertisementDetailComponent } from './components/advertisements-list/advertisement-detail/advertisement-detail.component';
import { ContractorProfileComponent } from './components/contractor-profile/contractor-profile.component';
import { ValideComponent } from './components/electronic-services/valide/valide.component';
import { ElectronicInvoiceComponent } from './components/electronic-services/electronic-invoice/electronic-invoice.component';
import { DocumentVerificationComponent } from './components/electronic-services/document-verification/document-verification.component';
import { NotificationsComponent } from './components/electronic-services/notifications/notifications.component';
import { ProceduresSearchComponent } from './components/procedures/procedures-search/procedures-search.component';
import { HelpHomeComponent } from './components/home/help-home/help-home.component';
import { SliderHomeComponent } from './components/home/slider-home/slider-home.component';
import { CarpetaCiudadanaComponent } from './components/carpeta-ciudadana/carpeta-ciudadana.component';
import { HomeComponent } from './components/home/home.component';
import { AdvertisementsListComponent } from './components/advertisements-list/advertisements-list.component';
import { HeaderCategoryComponent } from './shared/header-category/header-category.component';
import { ProceduresComponent } from './components/procedures/procedures.component';
import { ContactComponent } from './components/contact/contact.component';
import { ConoceLaSedeComponent } from './components/conoce-sede/conoce-la-sede.component';
import { HeaderKnowSedeComponent } from './components/conoce-sede/header/header-know-sede.component';

/* Shared */
import { HeaderComponent } from './shared/header/header.component';
import { WeatherComponent } from './shared/header/weather/weather.component';
import { HeaderSearchComponent } from './shared/header/header-search/header-search.component';
import { ContactPopoverComponent } from './shared/footer/contact-popover/contact-popover.component';
import { GenericStaticViewComponent } from './shared/generic-static-view/generic-static-view.component';
import { FooterComponent } from './shared/footer/footer.component';

/* Services */ 
import { WeatherService } from './services/moges-services/weather.service';
import { AuthService } from './services/moges-services/auth.service';
import { CategoriesService } from './services/moges-services/categories.service';
import { AdvertisementsService } from './services/moges-services/advertisements.service';
import { ProceduresService } from './services/moges-services/procedures.service';
import { GenericStaticHelpComponent } from './shared/generic-static-help/generic-static-help.component';
import { TechnicalRequirementsComponent } from './shared/footer/technical-requirements/technical-requirements.component';
import { HowElectronicCertificateComponent } from './shared/footer/how-electronic-certificate/how-electronic-certificate.component';
import { LanguageSelectorComponent } from './shared/header/language-selector/language-selector.component';
import { AccesibilityComponent } from './shared/footer/accesibility/accesibility.component';
import { LegalWarningComponent } from './shared/footer/legal-warning/legal-warning.component';
import { LanguagesService } from './services/moges-services/language.service';
import { SpinnerComponent } from './shared/spinner/spinner.component';
import { UserIdentificationComponent } from './components/carpeta-ciudadana/user-identification/user-identification.component';
import { RequestInfoComponent } from './components/carpeta-ciudadana/request-info/request-info.component';
import { DocumentationComponent } from './components/carpeta-ciudadana/documentation/documentation.component';
import { HeaderCarpetaCiudadanaComponent } from './shared/header-carpeta-ciudadana/header-carpeta-ciudadana.component';
import { DatosInteresadoComponent } from './components/carpeta-ciudadana/includes/datos-interesado/datos-interesado.component';
import { InstanciaGeneralComponent } from './components/carpeta-ciudadana/tramites/instancia-general/instancia-general.component';
import { DatosNotificacionComponent } from './components/carpeta-ciudadana/includes/datos-notificacion/datos-notificacion.component';
import { RequestsListComponent } from './components/carpeta-ciudadana/requests-list/requests-list.component';
import { AdjuntarDocComponent } from './components/carpeta-ciudadana/includes/adjuntar-documento/adjuntar-doc.component';
import { IdentityDataComponent } from './components/carpeta-ciudadana/user-identification/identity-data/identity-data.component';
import { NotificationMeansComponent } from './components/carpeta-ciudadana/user-identification/notification-means/notification-means.component';
import { RequesterDataComponent } from './components/carpeta-ciudadana/user-identification/requester-data/requester-data.component';
import { ActuationDataComponent } from './components/carpeta-ciudadana/user-identification/actuation-data/actuation-data.component';
import { SocialAddressComponent } from './components/carpeta-ciudadana/user-identification/social-address/social-address.component';
import { ProductiveEstablishmentAddressComponent } from './components/carpeta-ciudadana/user-identification/productive-establishment-address/productive-establishment-address.component';
import { LegalRepresentativeComponent } from './components/carpeta-ciudadana/user-identification/legal-representative/legal-representative.component';
import { RepresentativeDataComponent } from './components/carpeta-ciudadana/user-identification/representative-data/representative-data.component';
import { InterestedDataComponent } from './components/carpeta-ciudadana/user-identification/interested-data/interested-data.component';
import { ContactDataComponent } from './components/carpeta-ciudadana/user-identification/contact-data/contact-data.component';
import { ProcedureDetailComponent } from './components/procedures/procedure-detail/procedure-detail.component';
import { ProceduresHomeComponent } from './components/home/procedures-home/procedures-home.component';
import { AppUtils } from './utils/app-utils';
import { PresentarSolicitudComponent } from './components/carpeta-ciudadana/includes/presentar-solicitud/presentar-solicitud.component';
import { InputTextComponent } from './shared/form/fields/input-text/input-text.component';
import { InputSelectComponent } from './shared/form/fields/input-select/input-select.component';
import { ButtonBackComponent } from './shared/button-back/button-back.component';
import { InputNumberComponent } from './shared/form/fields/input-number/input-number.component';
import { LineaResistirComponent } from './components/carpeta-ciudadana/tramites/linea-resistir/linea-resistir.component';
import { ConfirmacionSolicitudComponent } from './components/carpeta-ciudadana/includes/confirmacion-solicitud/confirmacion-solicitud.componenet';
import { InputTextAreaComponent } from './shared/form/fields/input-text-area/input-text-area.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDatepicker, MatDatepickerInput, MatDatepickerContent,
MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormField } from '@angular/material/form-field';
import { DateComponent } from './components/carpeta-ciudadana/includes/date-component/date.component';
import { MatNativeDateModule } from '@angular/material/core';
import { InputDateComponent } from './shared/form/fields/input-date/input-date.component';
import { ProcedureInformationComponent } from './components/carpeta-ciudadana/tramites/linea-resistir/procedure-information/procedure-information.component';
import { DetailCostFinancedComponent } from './components/carpeta-ciudadana/tramites/linea-resistir/detail-cost-financed/detail-cost-financed.component';
import { AuthInterceptor } from './interceptors/auth-interceptor.service';
import { CarpetaUtils } from './utils/carpeta-utils';

@NgModule({
  declarations: [
    AppComponent,
    AdvertisementDetailComponent,
    ContractorProfileComponent,
    ValideComponent,
    ElectronicInvoiceComponent,
    DocumentVerificationComponent,
    NotificationsComponent,
    ProceduresSearchComponent,
    ProcedureDetailComponent,
    ProceduresComponent,
    HelpHomeComponent,
    SliderHomeComponent,
    ProceduresHomeComponent,
    CarpetaCiudadanaComponent,
    HeaderComponent,
    WeatherComponent,
    HomeComponent,
    AdvertisementsListComponent,
    HeaderCategoryComponent,
    FooterComponent,
    GenericStaticViewComponent,
    HeaderSearchComponent,
    ConoceLaSedeComponent,
    HeaderKnowSedeComponent,
    ContactComponent,
    ContactPopoverComponent,
    TechnicalRequirementsComponent,
    GenericStaticHelpComponent,
    HowElectronicCertificateComponent,
    LanguageSelectorComponent,
    AccesibilityComponent,
    LegalWarningComponent,
    SpinnerComponent,
    UserIdentificationComponent,
    RequestInfoComponent,
    DocumentationComponent,
    HeaderCarpetaCiudadanaComponent,
    DatosInteresadoComponent,
    InstanciaGeneralComponent,
    DatosNotificacionComponent,
    RequestsListComponent,
    AdjuntarDocComponent,
    PresentarSolicitudComponent,
    IdentityDataComponent,
    NotificationMeansComponent,
    RequesterDataComponent,
    ActuationDataComponent,
    SocialAddressComponent,
    ProductiveEstablishmentAddressComponent,
    LegalRepresentativeComponent,
    RepresentativeDataComponent,
    InterestedDataComponent,
    ContactDataComponent,
    InputTextComponent,
    InputSelectComponent,
    InputTextAreaComponent,
    ButtonBackComponent,
    InputNumberComponent,
    ConfirmacionSolicitudComponent,
    LineaResistirComponent,
    DateComponent,
    InputDateComponent,
    ProcedureInformationComponent,
    DetailCostFinancedComponent
    ],
  imports: [
    BrowserModule,
    AppRoutingModule,     
    BreadcrumbModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgxCaptchaModule,
    NgbModule,
    MatDatepickerModule,
    MatNativeDateModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    
    BrowserAnimationsModule,
  ],
  providers: [
    WeatherService,
    AuthService,
    CategoriesService,
    AdvertisementsService,
    ProceduresService,
    LanguagesService,
    CarpetaUtils,
    AppUtils,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
  }
  ],
  bootstrap: [AppComponent],
  exports: [ TranslateModule ]
})
export class AppModule { }
registerLocaleData(localeEs, 'es')

export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient);
} 