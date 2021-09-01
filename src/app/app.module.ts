import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import localeEs from '@angular/common/locales/es-PY';

import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { registerLocaleData } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { BreadcrumbModule} from 'angular-crumbs';



/* Services */ 
import { WeatherService } from './services/moges-services/weather.service';
import { AuthService } from './services/moges-services/auth.service';
import { CategoriesService } from './services/moges-services/categories.service';
import { AdvertisementsService } from './services/moges-services/advertisements.service';
import { ProceduresService } from './services/moges-services/procedures.service';
import { LanguagesService } from './services/moges-services/language.service';
import { AppUtils } from './utils/app-utils';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthInterceptor } from './interceptors/auth-interceptor.service';
import { CarpetaUtils } from './utils/carpeta-utils';
import { AdvertisementsModule } from './components/advertisements-list/advertisements.module';
import { SharedModule } from './shared/shared.module';
import { CarpetaCiudadanaModule } from './components/carpeta-ciudadana/carpeta-ciudadana.module';
import { HomeModule } from './components/home/home.module';
import { ElectronicServicesModule } from './components/electronic-services/electronic-services.module';
import { ContractorProfileModule } from './components/contractor-profile/contractor-profile.module';
import { ProceduresModule } from './components/procedures/procedures.module';
import { ConcoceSedeModule } from './components/conoce-sede/conoce-sede.module';
import { ContactModule } from './components/contact/contact.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    ConcoceSedeModule,
    CarpetaCiudadanaModule,
    BrowserModule,
    ElectronicServicesModule,
    ContractorProfileModule,
    HomeModule,
    ContactModule,
    AppRoutingModule, 
    SharedModule,    
    AdvertisementsModule,
    BreadcrumbModule,
    ProceduresModule,
    HttpClientModule,
    ReactiveFormsModule,
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