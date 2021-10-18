import localeEs from '@angular/common/locales/es-PY';
import { AdvertisementsModule } from './components/advertisements-list/advertisements.module';
import { AdvertisementsService } from './services/moges-services/advertisements.service';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AppUtils } from './utils/app-utils';
import { AuthInterceptor } from './interceptors/auth-interceptor.service';
import { AuthService } from './services/moges-services/auth.service';
import { BreadcrumbModule } from 'angular-crumbs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { CarpetaCiudadanaModule } from './components/carpeta-ciudadana/carpeta-ciudadana.module';
import { CarpetaUtils } from './utils/carpeta-utils';
import { CategoriesService } from './services/moges-services/categories.service';
import { ConcoceSedeModule } from './components/conoce-sede/conoce-sede.module';
import { ContactModule } from './components/contact/contact.module';
import { ContractorProfileModule } from './components/contractor-profile/contractor-profile.module';
import { ElectronicServicesModule } from './components/electronic-services/electronic-services.module';
import { HomeModule } from './components/home/home.module';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { HttpFilter } from './interceptors/auth-carpeta-interceptor.service';
import { LanguagesService } from './services/moges-services/language.service';
import { MatDialogModule } from '@angular/material/dialog';
import { NgModule } from '@angular/core';
import { ProceduresModule } from './components/procedures/procedures.module';
import { ProceduresService } from './services/moges-services/procedures.service';
import { ReactiveFormsModule } from '@angular/forms';
import { registerLocaleData } from '@angular/common';
import { SharedModule } from './shared/shared.module';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { WeatherService } from './services/moges-services/weather.service';


/* Services */ 

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    MatDialogModule,
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
  },
    { provide: HTTP_INTERCEPTORS, 
      useClass: HttpFilter, 
      multi: true },

  ],
  bootstrap: [AppComponent],
  exports: [ TranslateModule ]
})
export class AppModule { }
registerLocaleData(localeEs, 'es')

export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient);
} 