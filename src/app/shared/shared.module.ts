import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonBackComponent } from './button-back/button-back.component';
import { FooterComponent } from './footer/footer.component';
import { InputDateComponent } from './form/fields/input-date/input-date.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { HeaderCarpetaCiudadanaComponent } from './header-carpeta-ciudadana/header-carpeta-ciudadana.component';
import { HeaderCategoryComponent } from './header-category/header-category.component';
import { GenericStaticViewComponent } from './generic-static-view/generic-static-view.component';
import { InputTextComponent } from './form/fields/input-text/input-text.component';
import { InputSelectComponent } from './form/fields/input-select/input-select.component';
import { InputTextAreaComponent } from './form/fields/input-text-area/input-text-area.component';
import { ContactPopoverComponent } from './footer/contact-popover/contact-popover.component';
import { HeaderSearchComponent } from './header/header-search/header-search.component';
import { WeatherComponent } from './header/weather/weather.component';
import { LegalWarningComponent } from './footer/legal-warning/legal-warning.component';
import { AccesibilityComponent } from './footer/accesibility/accesibility.component';
import { LanguageSelectorComponent } from './header/language-selector/language-selector.component';
import { HowElectronicCertificateComponent } from './footer/how-electronic-certificate/how-electronic-certificate.component';
import { TechnicalRequirementsComponent } from './footer/technical-requirements/technical-requirements.component';
import { GenericStaticHelpComponent } from './generic-static-help/generic-static-help.component';
import { InputNumberComponent } from './form/fields/input-number/input-number.component';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HelpHomeComponent } from './footer/help-home/help-home.component';
import { SharedRoutingModule } from './shared-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HeaderComponent } from './header/header.component';
import { WeatherService } from '../services/moges-services/weather.service';
import { StyleService } from '../services/moges-services/style.service';
import { SafePipe } from '../components/carpeta-ciudadana/includes/firmarYpresentarPopUp/SafePipe.component';



@NgModule({
  declarations: [
    ButtonBackComponent,
    FooterComponent,
    InputDateComponent,
    SpinnerComponent,
    HeaderCarpetaCiudadanaComponent,
    HeaderCategoryComponent,
    GenericStaticViewComponent,
    InputTextComponent,
    InputSelectComponent,
    InputTextAreaComponent,
    InputNumberComponent,
    ContactPopoverComponent,
    HeaderSearchComponent,
    WeatherComponent,
    LegalWarningComponent,
    AccesibilityComponent,
    LanguageSelectorComponent,
    HowElectronicCertificateComponent,
    TechnicalRequirementsComponent,
    GenericStaticHelpComponent,
    HelpHomeComponent,
    HeaderComponent,
    SafePipe
  ],
  imports: [
    CommonModule,
    TranslateModule,
    SharedRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule
  ],
  exports: [
    ButtonBackComponent,
    FooterComponent,
    InputDateComponent,
    SpinnerComponent,
    HeaderCarpetaCiudadanaComponent,
    HeaderCategoryComponent,
    GenericStaticViewComponent,
    InputTextComponent,
    InputSelectComponent,
    InputTextAreaComponent,
    InputNumberComponent,
    ContactPopoverComponent,
    HeaderSearchComponent,
    WeatherComponent,
    LegalWarningComponent,
    AccesibilityComponent,
    LanguageSelectorComponent,
    HowElectronicCertificateComponent,
    TechnicalRequirementsComponent,
    GenericStaticHelpComponent,
    HelpHomeComponent,
    HeaderComponent,
    SafePipe
  ],
  providers: [
    WeatherService,
    StyleService
  ]
})
export class SharedModule { }
