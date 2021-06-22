import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdvertisementsListComponent } from './components/advertisements-list/advertisements-list.component';
import { CarpetaCiudadanaComponent } from './components/carpeta-ciudadana/carpeta-ciudadana.component';
import { ContractorProfileComponent } from './components/contractor-profile/contractor-profile.component';
import { HomeComponent } from './components/home/home.component';
import { ProcedimentsComponent } from './components/procediments/procediments.component';

const routes: Routes = [
  { path: '', redirectTo: 'inicio', pathMatch: 'full' },
  { path: 'inicio', component: HomeComponent},
  { path: 'procediments', component: ProcedimentsComponent },
  { path: 'carpeta-del-ciudadano', component: CarpetaCiudadanaComponent },
  { path: 'tablon-de-anuncios', component: AdvertisementsListComponent },
  { path: 'perfil-de-contratante', component: ContractorProfileComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
