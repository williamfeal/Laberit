import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConoceLaSedeComponent } from './components/conoce-sede/conoce-la-sede.component';
import { ContactComponent } from './components/contact/contact.component';
import { TranslateService } from '@ngx-translate/core';

const routes: Routes = [
  { path: '', redirectTo: 'inicio', pathMatch: 'full' },

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
