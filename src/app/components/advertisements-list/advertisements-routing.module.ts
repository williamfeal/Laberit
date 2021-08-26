import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AdvertisementDetailComponent } from "./advertisement-detail/advertisement-detail.component";
import { AdvertisementsListComponent } from "./advertisements-list.component";


const routes:Routes = [
    { path: 'tablon-de-anuncios', component: AdvertisementsListComponent },
    { path: 'tablon-de-anuncios/:idAnuncio', component: AdvertisementDetailComponent }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdvertisementsRoutingModule {

}