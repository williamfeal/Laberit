import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
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
import { TranslateService } from '@ngx-translate/core';

const routes: Routes = [
  { path: '', redirectTo: 'inicio', pathMatch: 'full' },
  { path: 'areas', component: ProceduresComponent },
  { path: 'catalogo-de-procedimientos', component: ProceduresSearchComponent },
  { path: 'perfil-de-contratante', component: ContractorProfileComponent},
  { path: 'categories/:idCategory', component: ProceduresComponent},
  { path: 'procedures/:idProcedure', component: ProcedureDetailComponent },
  { path: 'conoce-la-sede', component: ConoceLaSedeComponent},
  { path: 'contact', component: ContactComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
  constructor( private translateService:TranslateService) { }
}
