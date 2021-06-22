import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdvertisementsListComponent } from './components/advertisements-list/advertisements-list.component';
import { CarpetaCiudadanaComponent } from './components/carpeta-ciudadana/carpeta-ciudadana.component';
import { HomeComponent } from './components/home/home.component';
import { ProcedimentsComponent } from './components/procediments/procediments.component';

const routes: Routes = [
  { path: '', redirectTo: 'inicio', pathMatch: 'full' },
  { path: 'carpeta', component: CarpetaCiudadanaComponent },
  { path: 'anuncio', component: AdvertisementsListComponent },
  { path: 'inicio', component: HomeComponent},
  { path: 'procediments', component: ProcedimentsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
