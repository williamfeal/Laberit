import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TranslationComponent } from './translation/translation.component';

import localeEs from '@angular/common/locales/es-PY';

import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { registerLocaleData } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { NgxCaptchaModule } from 'ngx-captcha';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AdvertisementDetailComponent } from './components/advertisements-list/advertisement-detail/advertisement-detail.component';
import { ContractorProfileComponent } from './components/contractor-profile/contractor-profile.component';
import { ValideComponent } from './components/electronic-services/valide/valide.component';
import { ElectronicInvoiceComponent } from './components/electronic-services/electronic-invoice/electronic-invoice.component';
import { DocumentVerificationComponent } from './components/electronic-services/document-verification/document-verification.component';
import { NotificationsComponent } from './components/electronic-services/notifications/notifications.component';
import { ProcedimentsSearchComponent } from './components/procediments/procediments-search/procediments-search.component';
import { ProcedimentDetailComponent } from './components/procediments/procediment-detail/procediment-detail.component';
import { HelpHomeComponent } from './components/home/help-home/help-home.component';
import { SliderHomeComponent } from './components/home/slider-home/slider-home.component';
import { ProcedimentsHomeComponent } from './components/home/procediments-home/procediments-home.component';
import { CarpetaCiudadanaComponent } from './components/carpeta-ciudadana/carpeta-ciudadana.component';
import { HomeComponent } from './components/home/home.component';
import { AdvertisementsListComponent } from './components/advertisements-list/advertisements-list.component';
import { HeaderCategoryComponent } from './shared/header-category/header-category.component';
import { ProcedimentsComponent } from './components/procediments/procediments.component';
import { ContactComponent } from './components/contact/contact.component';
import { TransactProcedimentComponent } from './components/procediments/transact-procediment/transact-procediment.component';
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

@NgModule({
  declarations: [
    AppComponent,
    TranslationComponent,
    AdvertisementDetailComponent,
    ContractorProfileComponent,
    ValideComponent,
    ElectronicInvoiceComponent,
    DocumentVerificationComponent,
    NotificationsComponent,
    ProcedimentsSearchComponent,
    ProcedimentDetailComponent,
    ProcedimentsComponent,
    HelpHomeComponent,
    SliderHomeComponent,
    ProcedimentsHomeComponent,
    CarpetaCiudadanaComponent,
    HeaderComponent,
    WeatherComponent,
    HomeComponent,
    AdvertisementsListComponent,
    HeaderCategoryComponent,
    FooterComponent,
    GenericStaticViewComponent,
    TransactProcedimentComponent,
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
    HeaderCarpetaCiudadanaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgxCaptchaModule,
    NgbModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
  ],
  providers: [
    WeatherService,
    AuthService,
    CategoriesService,
    AdvertisementsService,
    ProceduresService,
    LanguagesService
  ],
  bootstrap: [AppComponent],
  exports: [ TranslateModule ]
})
export class AppModule { }
registerLocaleData(localeEs, 'es')

export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient);
} 