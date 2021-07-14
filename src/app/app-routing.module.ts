import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserIdentificationComponent } from './components/carpeta-ciudadana/user-identification/user-identification.component';
import { AdvertisementDetailComponent } from './components/advertisements-list/advertisement-detail/advertisement-detail.component';
import { AdvertisementsListComponent } from './components/advertisements-list/advertisements-list.component';
import { CarpetaCiudadanaComponent } from './components/carpeta-ciudadana/carpeta-ciudadana.component';
import { ConoceLaSedeComponent } from './components/conoce-sede/conoce-la-sede.component';
import { ContactComponent } from './components/contact/contact.component';
import { ContractorProfileComponent } from './components/contractor-profile/contractor-profile.component';
import { DocumentVerificationComponent } from './components/electronic-services/document-verification/document-verification.component';
import { ElectronicInvoiceComponent } from './components/electronic-services/electronic-invoice/electronic-invoice.component';
import { NotificationsComponent } from './components/electronic-services/notifications/notifications.component';
import { ValideComponent } from './components/electronic-services/valide/valide.component';
import { HomeComponent } from './components/home/home.component';
import { ProcedimentDetailComponent } from './components/procediments/procediment-detail/procediment-detail.component';
import { ProcedimentsSearchComponent } from './components/procediments/procediments-search/procediments-search.component';
import { ProcedimentsComponent } from './components/procediments/procediments.component';
import { TransactProcedimentComponent } from './components/procediments/transact-procediment/transact-procediment.component';
import { AuthGuardService } from './services/guards/auth-guard.service';
import { AccesibilityComponent } from './shared/footer/accesibility/accesibility.component';
import { HowElectronicCertificateComponent } from './shared/footer/how-electronic-certificate/how-electronic-certificate.component';
import { LegalWarningComponent } from './shared/footer/legal-warning/legal-warning.component';
import { TechnicalRequirementsComponent } from './shared/footer/technical-requirements/technical-requirements.component';
import { RequestInfoComponent } from './components/carpeta-ciudadana/request-info/request-info.component';
import { DocumentationComponent } from './components/carpeta-ciudadana/documentation/documentation.component';
import { TranslateService } from '@ngx-translate/core';
import { DatosInteresadoComponent } from './components/carpeta-ciudadana/includes/datos-interesado/datos-interesado.component';
import { InstanciaGeneralComponent } from './components/carpeta-ciudadana/instancia-general/instancia-general.component';

const routes: Routes = [
  { path: '', redirectTo: 'inicio', pathMatch: 'full' },
  { path: 'inicio', component: HomeComponent},
  { path: 'areas', component: ProcedimentsComponent },
  { path: 'catalogo-de-procedimientos', component: ProcedimentsSearchComponent },
  { path: 'tablon-de-anuncios', component: AdvertisementsListComponent },
  { path: 'tablon-de-anuncios/:idAnuncio', component: AdvertisementDetailComponent },
  { path: 'inicio', component: HomeComponent},
  { path: 'perfil-de-contratante', component: ContractorProfileComponent},
  { path: 'validacion', component: ValideComponent},
  { path: 'factura-electronica', component: ElectronicInvoiceComponent},
  { path: 'verifirma', component: DocumentVerificationComponent},
  { path: 'notificaciones', component: NotificationsComponent},
  { path: 'categories/:idCategory', component: ProcedimentsComponent},
  { path: 'procedures/:idProcedure', component: ProcedimentDetailComponent },
  { path: 'transact/:idProcedure', component: TransactProcedimentComponent},
  { path: 'conoce-la-sede', component: ConoceLaSedeComponent},
  { path: 'transact/:idProcedure', component: TransactProcedimentComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'requisitos-tecnicos', component: TechnicalRequirementsComponent },
  { path: 'certificado-electronico', component: HowElectronicCertificateComponent },
  { path: 'accesibilidad', component: AccesibilityComponent },
  { path: 'aviso-legal', component: LegalWarningComponent },
  { path: 'carpeta-del-ciudadano', component: CarpetaCiudadanaComponent },
  { path: 'carpeta-del-ciudadano/identificacion', 
    component: UserIdentificationComponent, 
    canActivate: [AuthGuardService],
    data: { breadcrumb:  [
      { title: 'carpeta_ciudadana.title', url: '/carpeta-del-ciudadano', terminal: false }, 
      { title: 'carpeta_ciudadana.identification.title', url: '', terminal: true }
    ]},
  },
  { path: 'carpeta-del-ciudadano/request-info', 
    component: RequestInfoComponent, 
    canActivate: [AuthGuardService],
    data: { breadcrumb: [
      { title: 'carpeta_ciudadana.title', url: '/carpeta-del-ciudadano', terminal: false }, 
      { title: 'carpeta_ciudadana.identification.title', url: '/carpeta-del-ciudadano/identificacion', terminal: false },
      { title: 'carpeta_ciudadana.request_info.title', url: '', terminal: true}] }
  },
  { path: 'carpeta-del-ciudadano/documentation', 
    component: DocumentationComponent, 
    canActivate: [AuthGuardService],
    data: { breadcrumb:  [
      { title: 'carpeta_ciudadana.title', url: '/carpeta-del-ciudadano', terminal: false }, 
      { title: 'carpeta_ciudadana.identification.title', url: '/carpeta-del-ciudadano/identificacion', terminal: false },
      { title: 'carpeta_ciudadana.request_info.title', url: '/carpeta-del-ciudadano/request-info', terminal: false},
      { title: 'carpeta_ciudadana.documentation.title', url: '', terminal: true} 
    ]}
    },
    { path: 'carpeta-del-ciudadano/identificacion/instanciaGeneral', 
    component: InstanciaGeneralComponent, 
    canActivate: [AuthGuardService],
    data: { breadcrumb:  [
      { title: 'carpeta_ciudadana.title', url: '/carpeta-del-ciudadano', terminal: false }, 
      { title: 'carpeta_ciudadana.identification.title', url: '/carpeta-del-ciudadano/identificacion', terminal: false },
      { title: 'carpeta_ciudadana.instance.title', url: '', terminal: true }
    ]},
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule {
  constructor( private translateService:TranslateService) { }
}
