import { BrowserModule } from '@angular/platform-browser';
import {  NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TranslationComponent } from './translation/translation.component';

import localeEs from '@angular/common/locales/es-PY';

import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { registerLocaleData } from '@angular/common';
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
import { HeaderCategoryComponent } from './shared/header/header-category/header-category.component';

/* Shared */
import { HeaderComponent } from './shared/header/header.component';
import { WeatherComponent } from './shared/header/weather/weather.component';

/* Services */ 
import { WeatherService } from './services/moges-services/weather.service';
import { AuthService } from './services/moges-services/auth.service';
import { GenericStaticViewComponent } from './shared/generic-static-view/generic-static-view.component';


export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient);
} 
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
    HelpHomeComponent,
    SliderHomeComponent,
    ProcedimentsHomeComponent,
    CarpetaCiudadanaComponent,
    HeaderComponent,
    WeatherComponent,
    HomeComponent,
    AdvertisementsListComponent,
    HeaderCategoryComponent,
    GenericStaticViewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }

    })
  ],
  providers: [
    WeatherService,
    AuthService
  ],
  bootstrap: [AppComponent],
  exports: [ TranslateModule ]
})
export class AppModule { }
registerLocaleData(localeEs, 'es')
