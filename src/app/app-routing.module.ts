import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserIdentificationComponent } from './components/carpeta-ciudadana/user-identification/user-identification.component';
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
  { path: 'perfil-de-contratante', component: ContractorProfileComponent},
  { path: 'validacion', component: ValideComponent},
  { path: 'factura-electronica', component: ElectronicInvoiceComponent},
  { path: 'verifirma', component: DocumentVerificationComponent},
  { path: 'notificaciones', component: NotificationsComponent},
  { path: 'categories/:idCategory', component: ProceduresComponent},
  { path: 'procedures/:idProcedure', component: ProcedureDetailComponent },
  { path: 'conoce-la-sede', component: ConoceLaSedeComponent},
  { path: 'contact', component: ContactComponent },

  ,
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
  constructor( private translateService:TranslateService) { }
}
