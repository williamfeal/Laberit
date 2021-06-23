import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdvertisementsListComponent } from './components/advertisements-list/advertisements-list.component';
import { CarpetaCiudadanaComponent } from './components/carpeta-ciudadana/carpeta-ciudadana.component';
import { ContractorProfileComponent } from './components/contractor-profile/contractor-profile.component';
import { DocumentVerificationComponent } from './components/electronic-services/document-verification/document-verification.component';
import { ElectronicInvoiceComponent } from './components/electronic-services/electronic-invoice/electronic-invoice.component';
import { NotificationsComponent } from './components/electronic-services/notifications/notifications.component';
import { ValideComponent } from './components/electronic-services/valide/valide.component';
import { HomeComponent } from './components/home/home.component';
import { ProcedimentsSearchComponent } from './components/procediments/procediments-search/procediments-search.component';
import { ProcedimentsComponent } from './components/procediments/procediments.component';

const routes: Routes = [
  { path: '', redirectTo: 'inicio', pathMatch: 'full' },
  { path: 'inicio', component: HomeComponent},
  { path: 'areas', component: ProcedimentsComponent },
  { path: 'catalogo-de-procedimientos', component: ProcedimentsSearchComponent },
  { path: 'carpeta-del-ciudadano', component: CarpetaCiudadanaComponent },
  { path: 'tablon-de-anuncios', component: AdvertisementsListComponent },
  { path: 'inicio', component: HomeComponent},
  { path: 'perfil-de-contratante', component: ContractorProfileComponent},
  { path: 'validacion', component: ValideComponent},
  { path: 'factura-electronica', component: ElectronicInvoiceComponent},
  { path: 'verifirma', component: DocumentVerificationComponent},
  { path: 'notificaciones', component: NotificationsComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
