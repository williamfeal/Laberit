import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CarpetaCiudadanaComponent } from './components/carpeta-ciudadana/carpeta-ciudadana.component';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  { path: '', redirectTo: 'inicio', pathMatch: 'full' },
  { path: 'web/guest/carpeta-del-ciudadano', component: CarpetaCiudadanaComponent },
  { path: 'inicio', component: HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
