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
import { ProcedureDetailComponent } from './components/procedures/procedure-detail/procedure-detail.component';
import { ProceduresSearchComponent } from './components/procedures/procedures-search/procedures-search.component';
import { ProceduresComponent } from './components/procedures/procedures.component';
import { AuthGuardService } from './services/guards/auth-guard.service';
import { AccesibilityComponent } from './shared/footer/accesibility/accesibility.component';
import { HowElectronicCertificateComponent } from './shared/footer/how-electronic-certificate/how-electronic-certificate.component';
import { LegalWarningComponent } from './shared/footer/legal-warning/legal-warning.component';
import { TechnicalRequirementsComponent } from './shared/footer/technical-requirements/technical-requirements.component';
import { RequestInfoComponent } from './components/carpeta-ciudadana/request-info/request-info.component';
import { TranslateService } from '@ngx-translate/core';
import { InstanciaGeneralComponent } from './components/carpeta-ciudadana/tramites/instancia-general/instancia-general.component';
import { RequestsListComponent } from './components/carpeta-ciudadana/requests-list/requests-list.component';
import { AdjuntarDocComponent } from './components/carpeta-ciudadana/includes/adjuntar-documento/adjuntar-doc.component';
import { PresentarSolicitudComponent } from './components/carpeta-ciudadana/includes/presentar-solicitud/presentar-solicitud.component';
import { LineaResistirComponent } from './components/carpeta-ciudadana/tramites/linea-resistir/linea-resistir.component';
import { ConfirmacionSolicitudComponent } from './components/carpeta-ciudadana/includes/confirmacion-solicitud/confirmacion-solicitud.componenet';

const routes: Routes = [
  { path: '', redirectTo: 'inicio', pathMatch: 'full' },
  { path: 'inicio', component: HomeComponent},
  { path: 'areas', component: ProceduresComponent },
  { path: 'catalogo-de-procedimientos', component: ProceduresSearchComponent },
  { path: 'tablon-de-anuncios', component: AdvertisementsListComponent },
  { path: 'tablon-de-anuncios/:idAnuncio', component: AdvertisementDetailComponent },
  { path: 'inicio', component: HomeComponent},
  { path: 'perfil-de-contratante', component: ContractorProfileComponent},
  { path: 'validacion', component: ValideComponent},
  { path: 'factura-electronica', component: ElectronicInvoiceComponent},
  { path: 'verifirma', component: DocumentVerificationComponent},
  { path: 'notificaciones', component: NotificationsComponent},
  { path: 'categories/:idCategory', component: ProceduresComponent},
  { path: 'procedures/:idProcedure', component: ProcedureDetailComponent },
  { path: 'conoce-la-sede', component: ConoceLaSedeComponent},
  { path: 'contact', component: ContactComponent },
  { path: 'requisitos-tecnicos', component: TechnicalRequirementsComponent },
  { path: 'certificado-electronico', component: HowElectronicCertificateComponent },
  { path: 'accesibilidad', component: AccesibilityComponent },
  { path: 'aviso-legal', component: LegalWarningComponent },
  { path: 'carpeta-del-ciudadano', component: CarpetaCiudadanaComponent },
  { path: 'carpeta-del-ciudadano/transact/:idProcedure', component: CarpetaCiudadanaComponent },
  { path: 'carpeta-del-ciudadano/identificacion', 
    component: UserIdentificationComponent, 
    canActivate: [AuthGuardService],
    data: { 
      menu : false,
      breadcrumb:  [
      { title: 'carpeta_ciudadana.title', url: '/inicio', terminal: false }, 
      { title: 'carpeta_ciudadana.identification.title', url: '', terminal: true }
    ]},
  },
  { path: 'carpeta-del-ciudadano/request-info', 
    component: RequestInfoComponent, 
    canActivate: [AuthGuardService],
    data: { 
      menu : false,
      breadcrumb: [
      { title: 'carpeta_ciudadana.title', url: '/inicio', terminal: false }, 
      { title: 'carpeta_ciudadana.identification.title', url: '/carpeta-del-ciudadano/identificacion', terminal: false },
      { title: 'carpeta_ciudadana.request_info.title', url: '', terminal: true}] }
  },
  { path: 'carpeta-del-ciudadano/requests-list', 
    component: RequestsListComponent, 
    canActivate: [AuthGuardService],
    data: { 
      menu : false,
      breadcrumb:  [
      { title: 'carpeta_ciudadana.title', url: '/inicio', terminal: false },
      { title: 'carpeta_ciudadana.requests-list.title', url: '', terminal: true } 
    ]}
    },
    { path: 'carpeta-del-ciudadano/instancia-general', 
    component: InstanciaGeneralComponent, 
    canActivate: [AuthGuardService],
    data: { 
      menu : false,
      breadcrumb:  [
      { title: 'carpeta_ciudadana.title', url: '/inicio', terminal: false }, 
      { title: 'carpeta_ciudadana.identification.title', url: '/carpeta-del-ciudadano/identificacion', terminal: false },
      { title: 'carpeta_ciudadana.instance.title', url: '', terminal: true }
    ]}
    },
    { path: 'carpeta-del-ciudadano/linea-resistir', 
    component: LineaResistirComponent, 
    canActivate: [AuthGuardService],
    data: {
      menu : false,
      breadcrumb:  [
      { title: 'carpeta_ciudadana.title', url: '/inicio', terminal: false }, 
      { title: 'carpeta_ciudadana.identification.title', url: '/carpeta-del-ciudadano/identificacion', terminal: false },
      { title: 'carpeta_ciudadana.linear_resistance.title', url: '', terminal: true }
    ]}
    },
    { path: 'carpeta-del-ciudadano/adjuntar', 
    component: AdjuntarDocComponent, 
    canActivate: [AuthGuardService],
    data: { 
      menu : false,
      breadcrumb:  [
      { title: 'carpeta_ciudadana.title', url: '/inicio', terminal: false }, 
      { title: 'carpeta_ciudadana.identification.title', url: '/carpeta-del-ciudadano/identificacion', terminal: false },
      { title: 'carpeta_ciudadana.instance.title', url: '/carpeta-del-ciudadano/instancia-general', terminal: false },
      { title: 'carpeta_ciudadana.instance.docAdd', url: '', terminal: true },
    ]},
  },
  { path: 'carpeta-del-ciudadano/firmar', 
    component: PresentarSolicitudComponent, 
    canActivate: [AuthGuardService],
    data: { 
      menu : false,
      breadcrumb:  [
      { title: 'carpeta_ciudadana.title', url: '/inicio', terminal: false }, 
      { title: 'carpeta_ciudadana.identification.title', url: '/carpeta-del-ciudadano/identificacion', terminal: false },
      { title: 'carpeta_ciudadana.instance.title', url: '/carpeta-del-ciudadano/instancia-general', terminal: false },
      { title: 'carpeta_ciudadana.instance.docAdd', url: 'carpeta-del-ciudadano/adjuntar', terminal: false },
      { title: 'carpeta_ciudadana.instance.presentarSolicitud', url: '', terminal: true },
    ]},
  },
  { path: 'carpeta-del-ciudadano/confirmacion', 
    component: ConfirmacionSolicitudComponent, 
    canActivate: [AuthGuardService],
    data: { 
      menu : false,
      breadcrumb:  [
      { title: 'carpeta_ciudadana.instance.presentarSolicitud', url: 'carpeta-del-ciudadano/firmar', terminal: false },
      { title: 'carpeta_ciudadana.confirmation.title', url: '', terminal: true },
    ]},
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
  constructor( private translateService:TranslateService) { }
}
